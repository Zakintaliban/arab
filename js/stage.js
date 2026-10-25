// The 3D clay map. Each article country is a wall (scaled to the current
// data height) topped by a bevelled "pillow" cap, so heights can animate
// without stretching the soft clay edge. Neighbouring context countries are
// low grey tiles; the sea is a bevelled clay slab.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/CSS2DRenderer.js';
import { makeProjection } from './projection.js';

const BASE_H = 1.4;          // wall height of article countries in relief mode
const MIN_H = 0.55;          // smallest data height
const MAX_DATA_H = 15;       // tallest data column
const CAP_DEPTH = 0.05;
const CONTEXT_DEPTH = 0.3;
const LIFT_HOVER = 0.7;
const LIFT_SELECT = 1.1;

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const LIGHTING = {
  light: { hemiSky: 0xffffff, hemiGround: 0xb9b4cc, hemi: 1.25, key: 0xfff1e0, keyI: 2.35, fill: 0xd9e3ff, fillI: 0.55, rim: 0.32 },
  dark: { hemiSky: 0x9aa6ff, hemiGround: 0x0c1128, hemi: 0.75, key: 0xffe6c8, keyI: 1.7, fill: 0x6f7dff, fillI: 0.45, rim: 0.42 },
};

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const damp = (current, target, rate, dt) => current + (target - current) * (1 - Math.exp(-rate * dt));

// Remove near-duplicate points and needle-thin spikes, which make
// ExtrudeGeometry's inward bevel fold over itself.
function cleanRing(flat) {
  let pts = [];
  for (let i = 0; i < flat.length; i += 2) pts.push(new THREE.Vector2(flat[i], -flat[i + 1]));
  if (pts.length > 1 && pts[0].distanceTo(pts[pts.length - 1]) < 1e-6) pts.pop();
  let changed = true;
  while (changed && pts.length > 3) {
    changed = false;
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const prev = out.length ? out[out.length - 1] : pts[pts.length - 1];
      const cur = pts[i];
      const next = pts[(i + 1) % pts.length];
      if (cur.distanceTo(prev) < 0.04) { changed = true; continue; }
      const a = prev.clone().sub(cur).normalize();
      const b = next.clone().sub(cur).normalize();
      if (a.dot(b) > 0.94) { changed = true; continue; } // angle < ~20°
      out.push(cur);
    }
    pts = out;
  }
  return pts;
}

function ringMetrics(pts) {
  let area = 0;
  let perim = 0;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    area += (pts[j].x + pts[i].x) * (pts[j].y - pts[i].y);
    perim += pts[i].distanceTo(pts[j]);
  }
  return { area: Math.abs(area / 2), perim };
}

function buildShape(poly) {
  const outer = cleanRing(poly[0]);
  if (outer.length < 3) return null;
  const shape = new THREE.Shape(outer);
  for (const hole of poly.slice(1)) {
    const h = cleanRing(hole);
    if (h.length >= 3) shape.holes.push(new THREE.Path(h));
  }
  const { area, perim } = ringMetrics(outer);
  return { shape, thickness: (2 * area) / perim, area };
}

function roundedRect(x0, y0, x1, y1, r) {
  const s = new THREE.Shape();
  s.moveTo(x0 + r, y0);
  s.lineTo(x1 - r, y0);
  s.quadraticCurveTo(x1, y0, x1, y0 + r);
  s.lineTo(x1, y1 - r);
  s.quadraticCurveTo(x1, y1, x1 - r, y1);
  s.lineTo(x0 + r, y1);
  s.quadraticCurveTo(x0, y1, x0, y1 - r);
  s.lineTo(x0, y0 + r);
  s.quadraticCurveTo(x0, y0, x0 + r, y0);
  return s;
}

function stripeTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = '#ffffff';
  g.fillRect(0, 0, 64, 64);
  g.strokeStyle = 'rgba(0,0,0,0.16)';
  g.lineWidth = 12;
  for (let i = -64; i <= 128; i += 32) {
    g.beginPath();
    g.moveTo(i, 64);
    g.lineTo(i + 64, 0);
    g.stroke();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(0.45, 0.45);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Clay: matte standard material plus a soft fresnel glow in the surface's own
// colour, the 3D equivalent of claymorphism's inner highlight.
function clayMaterial(color, rimStrength) {
  const m = new THREE.MeshStandardMaterial({ color, roughness: 0.82, metalness: 0 });
  m.userData.rim = { value: rimStrength };
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uRim = m.userData.rim;
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uRim;')
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        float rimF = pow(1.0 - saturate(dot(normalize(vViewPosition), normal)), 2.5);
        totalEmissiveRadiance += diffuseColor.rgb * rimF * uRim;`);
  };
  return m;
}

function cssColor(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(v || fallback);
}

export class MapStage extends EventTarget {
  constructor(container, geo, articles, { describe, labelHint = 'Open article' } = {}) {
    super();
    this.container = container;
    this.articles = articles;
    this.describe = describe;
    this.labelHint = labelHint;
    this.project = makeProjection(geo.projection);
    this.extent = geo.extent;
    this.countries = new Map();
    this.pickables = [];
    this.markers = [];
    this.selected = null;
    this.hovered = null;
    this.regionFocus = null;
    this.metric = 'relief';
    this.swayPaused = false;
    this.lastInteraction = performance.now();
    this.needsRender = true;
    this.labelsDirty = true;
    this.fly = null;
    this.sway = null;
    this.insets = { top: 0, bottom: 0 };
    this.routes = [];
    this.frameRequest = { type: 'overview' };

    try {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (err) {
      this.failed = true;
      container.classList.add('stage--nogl');
      return;
    }
    this.small = Math.min(innerWidth, innerHeight) < 600;
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, this.small ? 1.75 : 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.domElement.classList.add('stage__canvas');
    this.renderer.domElement.setAttribute('aria-hidden', 'true');

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.domElement.className = 'stage__labels';
    container.prepend(this.labelRenderer.domElement);
    container.prepend(this.renderer.domElement);

    this.tooltip = document.createElement('div');
    this.tooltip.className = 'map-tooltip glass';
    this.tooltip.hidden = true;
    container.append(this.tooltip);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 1, 1200);
    this.camera.position.set(0, 140, 150);

    this.buildLights();
    this.buildMap(geo);
    this.buildControls();
    this.bindPointer();
    this.bindKeys();
    this.refreshTheme();

    this.resize();
    new ResizeObserver(() => this.resize()).observe(container);
    this.visible = true;
    new IntersectionObserver(([e]) => {
      this.visible = e.isIntersecting;
      if (this.visible) this.kick();
    }).observe(container);
    document.addEventListener('visibilitychange', () => this.kick());

    this.clock = new THREE.Clock();
    this.overview(false);
    this.kick();
  }

  // ───────────────────────────── building ─────────────────────────────
  buildLights() {
    this.hemi = new THREE.HemisphereLight();
    this.key = new THREE.DirectionalLight();
    this.key.position.set(-70, 150, -80);
    this.key.castShadow = true;
    const s = this.key.shadow;
    s.mapSize.set(this.small ? 1024 : 2048, this.small ? 1024 : 2048);
    Object.assign(s.camera, { left: -110, right: 110, top: 80, bottom: -80, near: 20, far: 420 });
    s.bias = -0.0006;
    s.normalBias = 0.04;
    s.radius = 3;
    this.fill = new THREE.DirectionalLight();
    this.fill.position.set(90, 60, 120);
    this.scene.add(this.hemi, this.key, this.key.target, this.fill);
  }

  buildMap(geo) {
    this.map = new THREE.Group();
    this.map.rotation.x = -Math.PI / 2; // shapes live in XY; extrude along +Z = up
    this.scene.add(this.map);

    // Sea slab
    const [[x0, y0], [x1, y1]] = this.extent;
    const slabShape = roundedRect(x0, -y1, x1, -y0, 7);
    const slabGeo = new THREE.ExtrudeGeometry(slabShape, {
      depth: 3, bevelEnabled: true, bevelThickness: 1.6, bevelSize: 1.6, bevelOffset: -1.6, bevelSegments: 5, curveSegments: 8,
    });
    this.seaMat = clayMaterial(0xbfd6ea, 0.12);
    this.sea = new THREE.Mesh(slabGeo, this.seaMat);
    this.sea.position.z = -(3 + 1.6);
    this.sea.receiveShadow = true;
    this.map.add(this.sea);

    this.contextMat = clayMaterial(0xdcd8e6, 0.15);
    this.disputedMat = clayMaterial(0xe8e2d4, 0.15);
    this.disputedMat.map = stripeTexture();

    const byCode = Object.fromEntries(this.articles.map((a) => [a.code, a]));
    const regionIndex = {};

    for (const f of geo.features) {
      const shapes = f.polys.map(buildShape).filter(Boolean);
      if (!shapes.length) continue;

      if (f.kind === 'context') {
        for (const { shape, thickness } of shapes) {
          const s = Math.min(0.28, Math.max(0.02, thickness * 0.3));
          const geom = new THREE.ExtrudeGeometry(shape, {
            depth: CONTEXT_DEPTH, bevelEnabled: true, bevelThickness: 0.22, bevelSize: s, bevelOffset: -s, bevelSegments: 2, curveSegments: 1,
          });
          const mesh = new THREE.Mesh(geom, this.contextMat);
          mesh.receiveShadow = true;
          mesh.castShadow = true;
          this.map.add(mesh);
        }
        if (f.showLabel) this.addContextLabel(f);
        continue;
      }

      const article = byCode[f.code] || null;
      const group = new THREE.Group();
      this.map.add(group);
      const isDisputed = f.kind === 'disputed';
      const regionId = article ? article.region : 'disputed';
      regionIndex[regionId] = (regionIndex[regionId] ?? -1) + 1;
      const material = isDisputed ? this.disputedMat : clayMaterial(0xffffff, LIGHTING.light.rim);
      const walls = [];
      const caps = [];
      let bbox = new THREE.Box2();
      for (const { shape, thickness } of shapes) {
        const s = Math.min(0.85, Math.max(0.03, thickness * 0.3));
        const t = Math.min(0.6, 0.12 + s * 0.6);
        const wallGeo = new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false, curveSegments: 1 });
        const capGeo = new THREE.ExtrudeGeometry(shape, {
          depth: CAP_DEPTH, bevelEnabled: true, bevelThickness: t, bevelSize: s, bevelOffset: -s, bevelSegments: 4, curveSegments: 1,
        });
        const wall = new THREE.Mesh(wallGeo, material);
        const cap = new THREE.Mesh(capGeo, material);
        for (const m of [wall, cap]) {
          m.castShadow = true;
          m.receiveShadow = true;
          m.userData.code = f.code;
          group.add(m);
          this.pickables.push(m);
        }
        cap.userData.top = CAP_DEPTH + t;
        walls.push(wall);
        caps.push(cap);
        shape.getPoints().forEach((p) => bbox.expandByPoint(p));
      }
      const state = {
        code: f.code,
        article,
        regionId,
        variant: regionIndex[regionId],
        disputed: isDisputed,
        group,
        walls,
        caps,
        material,
        capTop: Math.max(...caps.map((c) => c.userData.top)),
        base: new THREE.Color(),
        h: isDisputed ? 0.5 : BASE_H,
        hTarget: isDisputed ? 0.5 : BASE_H,
        lift: 0, liftTarget: 0,
        dim: 0, dimTarget: 0,
        glow: 0, glowTarget: 0,
        anchor: new THREE.Vector2(f.label.x, f.label.y),
        radius: f.label.r,
        // bounding box in map units (x, y-down)
        box: { minX: bbox.min.x, maxX: bbox.max.x, minY: -bbox.max.y, maxY: -bbox.min.y },
        name: article ? (article.short || article.name) : 'Western Sahara',
      };
      this.countries.set(f.code, state);
      this.addCountryLabel(state);
      this.applyHeight(state);
    }
    this.focusBox = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity };
    for (const s of this.countries.values()) {
      this.focusBox.minX = Math.min(this.focusBox.minX, s.box.minX);
      this.focusBox.maxX = Math.max(this.focusBox.maxX, s.box.maxX);
      this.focusBox.minY = Math.min(this.focusBox.minY, s.box.minY);
      this.focusBox.maxY = Math.max(this.focusBox.maxY, s.box.maxY);
    }
  }

  addCountryLabel(state) {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'map-label' + (state.article?.featured ? ' map-label--featured' : '') + (state.disputed ? ' map-label--disputed' : '');
    el.textContent = state.disputed ? 'Western Sahara' : state.name;
    el.dataset.code = state.code;
    el.setAttribute('aria-label', state.disputed ? 'Western Sahara (disputed territory)' : `${this.labelHint}: ${state.article.name}`);
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      this.emit('select', { code: state.code });
    });
    el.addEventListener('pointerenter', () => this.setHover(state.code));
    el.addEventListener('pointerleave', () => this.setHover(null));
    el.addEventListener('focus', () => this.setHover(state.code, true));
    el.addEventListener('blur', () => this.setHover(null));
    const obj = new CSS2DObject(el);
    obj.center.set(0.5, 0.5);
    this.scene.add(obj);
    state.label = obj;
    state.labelEl = el;
    state.priority = state.radius * (state.article?.featured ? 1.4 : 1);
  }

  addContextLabel(f) {
    const el = document.createElement('span');
    el.className = 'map-label map-label--context';
    el.textContent = f.name.replace('S. Sudan', 'South Sudan');
    el.setAttribute('aria-hidden', 'true');
    const obj = new CSS2DObject(el);
    obj.position.set(f.label.x, CONTEXT_DEPTH + 0.6, f.label.y);
    this.scene.add(obj);
    (this.contextLabels ??= []).push({ obj, el, priority: f.label.r * 0.35 });
  }

  // ───────────────────────────── controls ─────────────────────────────
  buildControls() {
    const c = new OrbitControls(this.camera, this.renderer.domElement);
    c.enableDamping = true;
    c.dampingFactor = 0.08;
    c.minDistance = 14;
    c.maxDistance = 320;
    c.minPolarAngle = 0.1;
    c.maxPolarAngle = 1.22;
    c.screenSpacePanning = false;
    c.zoomSpeed = 0.9;
    c.rotateSpeed = 0.6;
    c.addEventListener('change', () => { this.needsRender = true; this.labelsDirty = true; });
    c.addEventListener('start', () => {
      this.userMoved = true;
      this.fly = null;
      this.sway = null;
      this.userDriving = true;
      this.lastInteraction = performance.now();
      this.container.classList.add('is-dragging');
    });
    c.addEventListener('end', () => {
      this.userDriving = false;
      this.lastInteraction = performance.now();
      this.container.classList.remove('is-dragging');
    });
    // Let a one-finger vertical swipe scroll the page on touch screens.
    this.renderer.domElement.style.touchAction = 'pan-y';
    this.controls = c;
  }

  bindPointer() {
    const el = this.renderer.domElement;
    this.pointer = new THREE.Vector2(9, 9);
    this.raycaster = new THREE.Raycaster();
    let down = null;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      this.pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      this.pointerClient = { x: e.clientX - r.left, y: e.clientY - r.top };
      this.pickPending = e.pointerType === 'mouse';
      this.kick();
    });
    el.addEventListener('pointerleave', () => { this.pointer.set(9, 9); this.setHover(null); });
    el.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; });
    el.addEventListener('pointerup', (e) => {
      if (!down) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
      const quick = performance.now() - down.t < 600;
      down = null;
      if (moved > 6 || !quick) return;
      const r = el.getBoundingClientRect();
      this.pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      const code = this.pick();
      if (code) this.emit('select', { code });
    });
  }

  bindKeys() {
    this.container.addEventListener('keydown', (e) => {
      if (e.target !== this.container) return;
      const c = this.controls;
      const step = 0.12;
      const offset = this.camera.position.clone().sub(c.target);
      const sph = new THREE.Spherical().setFromVector3(offset);
      let handled = true;
      if (e.key === 'ArrowLeft') sph.theta -= step;
      else if (e.key === 'ArrowRight') sph.theta += step;
      else if (e.key === 'ArrowUp') sph.phi = Math.max(c.minPolarAngle, sph.phi - step);
      else if (e.key === 'ArrowDown') sph.phi = Math.min(c.maxPolarAngle, sph.phi + step);
      else if (e.key === '+' || e.key === '=') sph.radius = Math.max(c.minDistance, sph.radius * 0.85);
      else if (e.key === '-' || e.key === '_') sph.radius = Math.min(c.maxDistance, sph.radius / 0.85);
      else handled = false;
      if (!handled) return;
      e.preventDefault();
      this.fly = null;
      this.sway = null;
      this.lastInteraction = performance.now();
      this.camera.position.copy(c.target).add(new THREE.Vector3().setFromSpherical(sph));
      c.update();
      this.kick();
    });
  }

  pick() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = this.raycaster.intersectObjects(this.pickables, false)[0];
    return hit ? hit.object.userData.code : null;
  }

  setHover(code, fromFocus = false) {
    if (code === this.hovered) return;
    this.hovered = code;
    for (const s of this.countries.values()) s.glowTarget = s.code === code ? 1 : 0;
    this.renderer.domElement.style.cursor = code ? 'pointer' : '';
    this.updateLift();
    if (code && this.describe && !fromFocus) {
      this.tooltip.innerHTML = this.describe(code, this.metric);
      this.tooltip.hidden = false;
    } else {
      this.tooltip.hidden = true;
    }
    this.emit('hover', { code });
    this.kick();
  }

  emit(type, detail) {
    this.dispatchEvent(new CustomEvent(type, { detail }));
  }

  // ───────────────────────────── public API ─────────────────────────────
  refreshTheme() {
    if (this.failed) return;
    const root = document.documentElement;
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    const L = dark ? LIGHTING.dark : LIGHTING.light;
    this.hemi.color.set(L.hemiSky);
    this.hemi.groundColor.set(L.hemiGround);
    this.hemi.intensity = L.hemi;
    this.key.color.set(L.key);
    this.key.intensity = L.keyI;
    this.fill.color.set(L.fill);
    this.fill.intensity = L.fillI;
    this.seaMat.color.copy(cssColor('--map-sea', '#bfd6ea'));
    this.contextMat.color.copy(cssColor('--map-land', '#dcd8e6'));
    this.disputedMat.color.copy(cssColor('--map-disputed', '#e8e2d4'));
    for (const r of this.routes) r.mesh.material.color.copy(cssColor('--accent', '#2c47b8'));
    const offsets = [0, 0.055, -0.05, 0.1, -0.085, 0.03, -0.025];
    for (const s of this.countries.values()) {
      if (s.disputed) continue;
      s.base.copy(cssColor(`--clay-${s.regionId}`, '#cccccc')).offsetHSL(0, 0, offsets[s.variant % offsets.length] * (dark ? 0.7 : 1));
      s.material.userData.rim.value = L.rim;
    }
    this.dark = dark;
    this.applyColors();
    this.kick();
  }

  setMetric(metric, values) {
    this.metric = metric;
    const nums = [...values.values()].filter((v) => v != null);
    const max = Math.max(...nums, 1);
    for (const s of this.countries.values()) {
      if (s.disputed) { s.hTarget = metric === 'relief' ? 0.5 : MIN_H * 0.6; continue; }
      if (metric === 'relief') { s.hTarget = BASE_H; s.noData = false; continue; }
      const v = values.get(s.code);
      s.noData = v == null;
      s.hTarget = v == null ? MIN_H * 0.6 : MIN_H + (MAX_DATA_H - MIN_H) * (v / max);
    }
    this.updateDim();
    if (reducedMotion.matches) for (const s of this.countries.values()) { s.h = s.hTarget; this.applyHeight(s); }
    if (!this.userMoved && this.frameRequest.type === 'country') this.reframe(true);
    this.labelsDirty = true;
    this.kick();
  }

  // Space covered by HUD panels at the top and bottom of the stage, in px.
  // The camera frames the map inside what is left.
  setInsets({ top = 0, bottom = 0 }) {
    if (this.failed) return;
    if (Math.abs(top - this.insets.top) < 2 && Math.abs(bottom - this.insets.bottom) < 2) return;
    this.insets = { top, bottom };
    this.applyViewOffset();
    if (!this.userMoved) this.reframe(false);
    this.kick();
  }

  reframe(animate = true) {
    const r = this.frameRequest;
    if (r.type === 'country') this.focusCountry(r.code, animate);
    else if (r.type === 'region') this.focusRegion(r.id, animate);
    else if (r.type === 'box') this.flyToBox(r.box, { ...r.opts, animate });
    else this.overview(animate);
  }

  select(code, { animate = true } = {}) {
    this.selected = code && this.countries.has(code) ? code : null;
    this.regionFocus = null;
    this.highlighted = null;
    this.updateLift();
    this.updateDim();
    if (this.selected) this.focusCountry(this.selected, animate);
    else this.overview(animate);
  }

  focusRegion(regionId, animate = true) {
    this.regionFocus = regionId;
    this.selected = null;
    this.highlighted = null;
    this.updateLift();
    this.updateDim();
    if (!regionId) { this.overview(animate); return; }
    this.frameRequest = { type: 'region', id: regionId };
    this.userMoved = false;
    const box = { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity };
    for (const s of this.countries.values()) {
      if (s.regionId !== regionId) continue;
      box.minX = Math.min(box.minX, s.box.minX); box.maxX = Math.max(box.maxX, s.box.maxX);
      box.minY = Math.min(box.minY, s.box.minY); box.maxY = Math.max(box.maxY, s.box.maxY);
    }
    this.flyToBox(box, { polar: 0.8, pad: 1.1, animate });
  }

  // Show pins. Items with an id are buttons that emit 'marker'; owner is the
  // country whose tile the pin sits on (defaults to code).
  setMarkers(code, items) {
    for (const m of this.markers) this.scene.remove(m.obj);
    this.markers = [];
    if (!items.length) { this.kick(); return; }
    for (const item of items) {
      const [x, y] = this.project(item.at);
      const el = document.createElement(item.id ? 'button' : 'span');
      el.className = `map-marker map-marker--${item.kind}`;
      el.innerHTML = `<span class="map-marker__dot" aria-hidden="true"></span><span class="map-marker__text"></span>`;
      el.querySelector('.map-marker__text').textContent = item.name;
      if (item.id) {
        el.type = 'button';
        el.setAttribute('aria-label', item.label || `Show landmark in article: ${item.name}`);
        el.addEventListener('click', (e) => { e.stopPropagation(); this.emit('marker', { id: item.id }); });
      } else {
        el.setAttribute('aria-hidden', 'true');
      }
      const obj = new CSS2DObject(el);
      obj.center.set(0, 0.5);
      this.scene.add(obj);
      this.markers.push({ obj, el, x, y, owner: item.owner || code, kind: item.kind, priority: item.priority });
    }
    this.placeMarkers();
    this.labelsDirty = true;
    this.kick();
  }

  flyToLatLon(at, distance = 26) {
    const [x, y] = this.project(at);
    const s = this.selected && this.countries.get(this.selected);
    const h = s ? s.h + s.capTop + s.lift : 1;
    this.flyTo(new THREE.Vector3(x, h, y), distance, 0.78, null);
  }

  overview(animate = true) {
    this.frameRequest = { type: 'overview' };
    this.userMoved = false;
    // On tall, narrow screens look more steeply down and let the far west and
    // east run off the edges; the map can be dragged to see them.
    const portrait = this.camera.aspect < 1;
    this.flyToBox(this.focusBox, { polar: portrait ? 0.5 : 0.72, azimuth: 0, pad: portrait ? 0.72 : 1.02, animate });
  }

  setSwayPaused(paused) {
    this.swayPaused = paused;
    this.sway = null;
  }

  // Keep these countries in full colour and dim the rest (null clears).
  highlight(codes) {
    this.highlighted = codes?.length ? new Set(codes) : null;
    this.selected = null;
    this.regionFocus = null;
    this.updateLift();
    this.updateDim();
    this.kick();
  }

  // Frame a set of [lat, lon] points, never closer than a ~18-unit box.
  flyToPoints(ats, animate = true) {
    const pts = ats.map((a) => this.project(a));
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const box = {
      minX: Math.min(...xs, cx - 9), maxX: Math.max(...xs, cx + 9),
      minY: Math.min(...ys, cy - 9), maxY: Math.max(...ys, cy + 9),
    };
    const opts = { polar: 0.8, pad: 1.3 };
    this.frameRequest = { type: 'box', box, opts };
    this.userMoved = false;
    this.flyToBox(box, { ...opts, animate });
  }

  // Clay tubes arcing through [lat, lon] points, each drawing itself in.
  // faint: an earlier leg, translucent. dotted: an uncertain route, a row of beads.
  setRoutes(list) {
    for (const r of this.routes) { this.scene.remove(r.mesh); r.mesh.geometry.dispose(); r.mesh.material.dispose(); }
    this.routes = [];
    for (const { ats, faint, dotted } of list) {
      if (!ats || ats.length < 2) continue;
      const path = this.arcPath(ats);
      const mat = clayMaterial(cssColor('--accent', '#2c47b8'), 0.3);
      if (faint) Object.assign(mat, { transparent: true, opacity: 0.32 });
      let mesh;
      if (dotted) {
        const n = Math.max(2, Math.round(path.getLength() / 1.1));
        mesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.2, 10, 8), mat, n);
        const m = new THREE.Matrix4();
        path.getSpacedPoints(n - 1).forEach((p, i) => mesh.setMatrixAt(i, m.makeTranslation(p.x, p.y, p.z)));
      } else {
        mesh = new THREE.Mesh(new THREE.TubeGeometry(path, 48 * (ats.length - 1), faint ? 0.11 : 0.17, 8, false), mat);
      }
      mesh.castShadow = !faint;
      // step: index count per tube segment (radial 8 × 6), so the reveal never cuts a ring in half
      const r = { mesh, reveal: reducedMotion.matches || faint ? 1 : 0, total: dotted ? mesh.count : mesh.geometry.index.count, step: dotted ? 1 : 48 };
      this.revealRoute(r);
      this.scene.add(mesh);
      this.routes.push(r);
    }
    this.kick();
  }

  setRoute(ats) {
    this.setRoutes(ats ? [{ ats }] : []);
  }

  arcPath(ats) {
    const y0 = BASE_H + 0.9;
    const pts = ats.map((a) => { const [x, z] = this.project(a); return new THREE.Vector3(x, y0, z); });
    const path = new THREE.CurvePath();
    for (let i = 0; i < pts.length - 1; i++) {
      const mid = pts[i].clone().add(pts[i + 1]).multiplyScalar(0.5);
      mid.y += 1.2 + pts[i].distanceTo(pts[i + 1]) * 0.22;
      path.add(new THREE.QuadraticBezierCurve3(pts[i], mid, pts[i + 1]));
    }
    return path;
  }

  revealRoute(r) {
    const n = Math.floor((r.total * r.reveal) / r.step) * r.step;
    if (r.mesh.isInstancedMesh) r.mesh.count = n;
    else r.mesh.geometry.setDrawRange(0, n);
  }

  // ───────────────────────────── internals ─────────────────────────────
  updateLift() {
    for (const s of this.countries.values()) {
      s.liftTarget = s.code === this.selected ? LIFT_SELECT : s.code === this.hovered ? LIFT_HOVER : 0;
    }
  }

  updateDim() {
    for (const s of this.countries.values()) {
      let dim = 0;
      if (this.selected && s.code !== this.selected) dim = 0.55;
      if (this.regionFocus && s.regionId !== this.regionFocus) dim = 0.6;
      if (this.highlighted && !this.highlighted.has(s.code)) dim = 0.85;
      if (s.noData && this.metric !== 'relief') dim = Math.max(dim, 0.75);
      s.dimTarget = dim;
    }
  }

  applyHeight(s) {
    for (const w of s.walls) w.scale.z = s.h;
    for (const c of s.caps) c.position.z = s.h;
    s.group.position.z = s.lift;
    if (s.label) s.label.position.set(s.anchor.x, s.h + s.capTop + s.lift + 0.35, s.anchor.y);
  }

  applyColors() {
    const grey = new THREE.Color(this.dark ? 0x2a3157 : 0xd9dbe4);
    for (const s of this.countries.values()) {
      if (s.disputed) continue;
      s.material.color.copy(s.base).lerp(grey, s.dim * 0.75);
      s.material.emissive.copy(s.base).multiplyScalar(s.glow * (this.dark ? 0.22 : 0.16));
    }
  }

  placeMarkers() {
    for (const m of this.markers) {
      const s = this.countries.get(m.owner);
      const h = s ? s.h + s.capTop + s.lift : 0.55; // no owner: a low context tile
      m.obj.position.set(m.x, h + 0.15, m.y);
    }
  }

  // Distance that fits a map-space box into the free part of the stage at the
  // given tilt. The near (southern) edge is closer to the camera, so it sets
  // the width limit.
  fitDistance(box, polar, pad = 1.15) {
    const w = Math.max(box.maxX - box.minX, 6) * pad;
    const d = Math.max(box.maxY - box.minY, 6) * pad;
    const h = this.container.clientHeight || 1;
    const free = Math.max(0.25, (h - this.insets.top - this.insets.bottom) / h);
    const vfov = THREE.MathUtils.degToRad(this.camera.fov);
    const hfov = 2 * Math.atan(Math.tan(vfov / 2) * this.camera.aspect);
    const vEff = 2 * Math.atan(Math.tan(vfov / 2) * free);
    const byW = (w / 2) / Math.tan(hfov / 2) + (d / 2) * Math.sin(polar);
    const byD = (d * Math.cos(polar)) / 2 / Math.tan(vEff / 2) + (d / 2) * Math.sin(polar) * 0.5;
    return Math.max(byW, byD);
  }

  applyViewOffset() {
    const { clientWidth: w, clientHeight: h } = this.container;
    if (!w || !h) return;
    const shift = (this.insets.top - this.insets.bottom) / 2;
    this.camera.setViewOffset(w, h, 0, -shift, w, h);
    this.camera.updateProjectionMatrix();
    this.needsRender = true;
    this.labelsDirty = true;
  }

  focusCountry(code, animate) {
    const s = this.countries.get(code);
    const box = s.box;
    this.frameRequest = { type: 'country', code };
    this.userMoved = false;
    const polar = 0.8;
    const dist = Math.max(34, this.fitDistance(box, polar, 1.6) + s.hTarget * 1.6);
    const target = new THREE.Vector3((box.minX + box.maxX) / 2, s.hTarget * 0.6, (box.minY + box.maxY) / 2);
    this.flyTo(target, dist, polar, null, animate);
  }

  flyToBox(box, { polar = 0.8, azimuth = null, pad = 1.15, animate = true } = {}) {
    const dist = this.fitDistance(box, polar, pad);
    const target = new THREE.Vector3((box.minX + box.maxX) / 2, 0, (box.minY + box.maxY) / 2);
    this.flyTo(target, dist, polar, azimuth, animate);
  }

  flyTo(target, distance, polar, azimuth, animate = true) {
    const c = this.controls;
    const from = new THREE.Spherical().setFromVector3(this.camera.position.clone().sub(c.target));
    const to = new THREE.Spherical(distance, polar, azimuth ?? THREE.MathUtils.clamp(from.theta, -0.5, 0.5));
    // take the short way round
    while (to.theta - from.theta > Math.PI) to.theta -= 2 * Math.PI;
    while (to.theta - from.theta < -Math.PI) to.theta += 2 * Math.PI;
    this.sway = null;
    if (!animate || reducedMotion.matches || !this.clock) {
      c.target.copy(target);
      this.camera.position.copy(target).add(new THREE.Vector3().setFromSpherical(to));
      this.camera.lookAt(target);
      c.update();
      this.fly = null;
      this.needsRender = true;
      this.labelsDirty = true;
      return;
    }
    this.fly = { t: 0, dur: 1.5, fromTarget: c.target.clone(), toTarget: target, from, to };
    this.lastInteraction = performance.now();
    this.kick();
  }

  resize() {
    if (this.failed) return;
    const { clientWidth: w, clientHeight: h } = this.container;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.applyViewOffset();
    this.renderer.setSize(w, h, false);
    this.labelRenderer.setSize(w, h);
    this.needsRender = true;
    this.labelsDirty = true;
    if (!this.userMoved && this.clock) this.reframe(false);
    this.kick();
  }

  kick() {
    if (this.failed || this.raf) return;
    this.raf = requestAnimationFrame(() => this.frame());
  }

  frame() {
    this.raf = 0;
    if (!this.visible || document.hidden) return;
    const dt = Math.min(this.clock.getDelta(), 0.1);
    let active = false;
    const now = performance.now();

    // Camera flight
    if (this.fly) {
      const f = this.fly;
      f.t = Math.min(1, f.t + dt / f.dur);
      const k = ease(f.t);
      const sph = new THREE.Spherical(
        THREE.MathUtils.lerp(f.from.radius, f.to.radius, k),
        THREE.MathUtils.lerp(f.from.phi, f.to.phi, k),
        THREE.MathUtils.lerp(f.from.theta, f.to.theta, k),
      );
      this.controls.target.lerpVectors(f.fromTarget, f.toTarget, k);
      this.camera.position.copy(this.controls.target).add(new THREE.Vector3().setFromSpherical(sph));
      if (f.t >= 1) { this.fly = null; this.lastInteraction = now; }
      active = true;
    }

    // Idle sway: a slow, small turn back and forth so the clay reads as 3D.
    const canSway = !this.swayPaused && !reducedMotion.matches && !this.fly && !this.userDriving && now - this.lastInteraction > 5000;
    if (canSway) {
      const offset = this.camera.position.clone().sub(this.controls.target);
      const sph = new THREE.Spherical().setFromVector3(offset);
      if (!this.sway) this.sway = { base: sph.theta, phase: 0 };
      this.sway.phase += dt;
      sph.theta = this.sway.base + 0.09 * Math.sin((this.sway.phase / 26) * Math.PI * 2);
      this.camera.position.copy(this.controls.target).add(new THREE.Vector3().setFromSpherical(sph));
      active = true;
    }

    // Keep the camera target over the map
    const t = this.controls.target;
    const [[x0, y0], [x1, y1]] = this.extent;
    t.x = THREE.MathUtils.clamp(t.x, x0, x1);
    t.z = THREE.MathUtils.clamp(t.z, y0, y1);
    if (this.controls.update()) active = true;

    // Country heights, lifts, dimming, glow
    let moved = false;
    const rate = reducedMotion.matches ? 60 : 7;
    for (const s of this.countries.values()) {
      const before = s.h + s.lift + s.dim + s.glow;
      s.h = damp(s.h, s.hTarget, rate * 0.8, dt);
      s.lift = damp(s.lift, s.liftTarget, rate * 1.4, dt);
      s.dim = damp(s.dim, s.dimTarget, rate, dt);
      s.glow = damp(s.glow, s.glowTarget, rate * 1.6, dt);
      if (Math.abs(s.h + s.lift + s.dim + s.glow - before) > 1e-4) {
        moved = true;
        this.applyHeight(s);
      }
    }
    if (moved) {
      this.applyColors();
      this.placeMarkers();
      this.labelsDirty = true;
      active = true;
    }

    for (const r of this.routes) {
      if (r.reveal >= 1) continue;
      r.reveal = Math.min(1, r.reveal + dt / 1.8);
      this.revealRoute(r);
      active = true;
    }

    // Hover picking (mouse only)
    if (this.pickPending && !this.userDriving) {
      this.pickPending = false;
      this.setHover(this.pick());
    }
    if (!this.tooltip.hidden && this.pointerClient) {
      const { x, y } = this.pointerClient;
      const w = this.container.clientWidth;
      const tw = this.tooltip.offsetWidth;
      const left = x + 18 + tw > w - 8 ? x - tw - 18 : x + 18;
      this.tooltip.style.transform = `translate(${Math.round(left)}px, ${Math.round(y + 14)}px)`;
    }

    if (active || this.needsRender) {
      this.renderer.render(this.scene, this.camera);
      this.labelRenderer.render(this.scene, this.camera);
      this.needsRender = false;
    }
    if (this.labelsDirty && (!this.lastLabelPass || now - this.lastLabelPass > 90)) {
      this.resolveLabels();
      this.lastLabelPass = now;
      this.labelsDirty = false;
    }
    if (active || this.labelsDirty || canSway || this.fly) this.kick();
  }

  // Hide labels that would overlap a more important one.
  resolveLabels() {
    const items = [];
    for (const s of this.countries.values()) {
      if (!s.labelEl) continue;
      // The open country is named by its capital pin and the article title.
      s.labelEl.classList.toggle('is-selected', s.code === this.selected);
      if (s.code === this.selected) { s.labelEl.tabIndex = -1; continue; }
      let p = s.priority;
      if (s.code === this.selected) p = 1e6;
      else if (s.code === this.hovered) p = 1e5;
      else if (this.regionFocus && s.regionId === this.regionFocus) p += 50;
      items.push({ el: s.labelEl, p, focusable: true });
    }
    for (const m of this.markers) items.push({ el: m.el, p: m.priority ?? (m.kind === 'capital' ? 2e5 : m.kind === 'landmark' ? 900 : 800) });
    for (const c of this.contextLabels || []) items.push({ el: c.el, p: c.priority });
    items.sort((a, b) => b.p - a.p);
    const kept = [];
    const host = this.container.getBoundingClientRect();
    for (const it of items) {
      if (it.el.style.display === 'none') continue;
      const r = it.el.getBoundingClientRect();
      const box = { l: r.left - 2, r: r.right + 2, t: r.top - 1, b: r.bottom + 1 };
      const offscreen = r.right < host.left || r.left > host.right || r.bottom < host.top || r.top > host.bottom;
      const clash = kept.some((k) => box.l < k.r && box.r > k.l && box.t < k.b && box.b > k.t);
      const hide = offscreen || clash;
      it.el.classList.toggle('is-hidden', hide);
      if (it.focusable) it.el.tabIndex = hide ? -1 : 0;
      if (!hide) kept.push(box);
    }
  }
}
