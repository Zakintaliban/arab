// Builds assets/geo/mena.json: country outlines for the 3D clay map, already
// projected (conic equal-area) into flat map units so the browser only has to
// extrude them. Source: Natural Earth 1:50m via the world-atlas package.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as topojson from 'topojson-client';
import { presimplify, simplify } from 'topojson-simplify';
import { geoConicEqualArea, geoPath, geoArea } from 'd3-geo';
import polygonClipping from 'polygon-clipping';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const topo = JSON.parse(readFileSync(join(root, 'node_modules/world-atlas/countries-50m.json'), 'utf8'));

// world-atlas numeric id -> article code
const FOCUS = {
  '504': 'ma', '012': 'dz', '788': 'tn', '434': 'ly', '818': 'eg', '729': 'sd', '478': 'mr',
  '422': 'lb', '760': 'sy', '400': 'jo', '376': 'il', '275': 'ps', '368': 'iq',
  '682': 'sa', '414': 'kw', '048': 'bh', '634': 'qa', '784': 'ae', '512': 'om', '887': 'ye',
  '364': 'ir', '792': 'tr', '031': 'az',
};

// Small context countries get a faint label so the map stays legible.
const CONTEXT_LABELS = new Set(['Spain', 'Italy', 'Greece', 'Cyprus', 'Georgia', 'Armenia',
  'Turkmenistan', 'Afghanistan', 'Pakistan', 'Mali', 'Niger', 'Chad', 'Ethiopia', 'Eritrea',
  'Bulgaria', 'Uzbekistan', 'Kazakhstan', 'S. Sudan', 'Somalia', 'Djibouti', 'Russia', 'Portugal', 'Senegal']);

const simplified = simplify(presimplify(topo), 0.00035);
const fc = topojson.feature(simplified, simplified.objects.countries);

// --- Western Sahara -----------------------------------------------------
// Natural Earth folds the Moroccan-administered part of Western Sahara into
// Morocco. Split it back out at 27°40'N (the territory's northern limit) so
// the whole territory can be drawn as one disputed area.
const SPLIT_LAT = 27 + 40 / 60;
const north = [[[-30, SPLIT_LAT], [10, SPLIT_LAT], [10, 40], [-30, 40], [-30, SPLIT_LAT]]];
const south = [[[-30, 15], [10, 15], [10, SPLIT_LAT], [-30, SPLIT_LAT], [-30, 15]]];
const asMulti = (g) => (g.type === 'Polygon' ? [g.coordinates] : g.coordinates);
const morocco = fc.features.find((f) => f.id === '504');
const wsahara = fc.features.find((f) => f.properties.name === 'W. Sahara');
const moroccoProper = polygonClipping.intersection(asMulti(morocco.geometry), [north]);
const wsFull = polygonClipping.union(
  polygonClipping.intersection(asMulti(morocco.geometry), [south]),
  asMulti(wsahara.geometry),
);
morocco.geometry = { type: 'MultiPolygon', coordinates: moroccoProper };
wsahara.geometry = { type: 'MultiPolygon', coordinates: wsFull };
wsahara.id = 'eh';

// polygon-clipping returns planar (counter-clockwise exterior) rings; d3 wants
// spherical winding (clockwise exterior). Reverse every ring.
for (const f of [morocco, wsahara]) {
  f.geometry.coordinates = f.geometry.coordinates.map((poly) => poly.map((ring) => ring.slice().reverse()));
}

// --- projection -----------------------------------------------------------
const focusFeatures = fc.features.filter((f) => FOCUS[f.id]);
const W = 160;
const H = 80;
const projection = geoConicEqualArea()
  .parallels([18, 38])
  .rotate([-24, 0])
  .fitExtent([[-W / 2, -H / 2], [W / 2, H / 2]], { type: 'FeatureCollection', features: focusFeatures });

const PAD = 10;
const [[bx0, by0], [bx1, by1]] = geoPath(projection).bounds({ type: 'FeatureCollection', features: focusFeatures });
const clip = [[bx0 - PAD, by0 - PAD], [bx1 + PAD, by1 + PAD]];
projection.clipExtent(clip);

const round = (v) => Math.round(v * 100) / 100;

function ringArea(r) {
  let a = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) a += (r[j][0] + r[i][0]) * (r[j][1] - r[i][1]);
  return a / 2;
}
function inside(pt, ring) {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

// Collect projected rings through a path context, then group holes under
// the exterior ring that contains them.
function projectFeature(f) {
  const rings = [];
  let cur = null;
  geoPath(projection, {
    moveTo(x, y) { cur = [[x, y]]; rings.push(cur); },
    lineTo(x, y) { cur.push([x, y]); },
    closePath() {},
    arc() {},
  })(f);
  const clean = rings
    .map((r) => r.map(([x, y]) => [round(x), round(y)]))
    .map((r) => r.filter((p, i) => i === 0 || p[0] !== r[i - 1][0] || p[1] !== r[i - 1][1]))
    .filter((r) => r.length >= 4);
  const withArea = clean.map((r) => ({ r, a: Math.abs(ringArea(r)) })).sort((a, b) => b.a - a.a);
  const polys = [];
  for (const { r, a } of withArea) {
    const host = polys.find((p) => inside(r[0], p.outer));
    if (host) host.holes.push(r);
    else polys.push({ outer: r, holes: [], area: a });
  }
  return polys;
}

// Pole of inaccessibility on a coarse grid: a label anchor that is always inside.
function labelPoint(poly) {
  const xs = poly.outer.map((p) => p[0]);
  const ys = poly.outer.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  let best = null;
  const N = 48;
  for (let i = 0; i <= N; i++) {
    for (let j = 0; j <= N; j++) {
      const p = [x0 + ((x1 - x0) * i) / N, y0 + ((y1 - y0) * j) / N];
      if (!inside(p, poly.outer) || poly.holes.some((h) => inside(p, h))) continue;
      let d = Infinity;
      for (const ring of [poly.outer, ...poly.holes]) {
        for (let k = 0, m = ring.length - 1; k < ring.length; m = k++) {
          d = Math.min(d, segDist(p, ring[m], ring[k]));
        }
      }
      if (!best || d > best.d) best = { p, d };
    }
  }
  return best ? { x: round(best.p[0]), y: round(best.p[1]), r: round(best.d) } : null;
}
function segDist(p, a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

const out = [];
let points = 0;
for (const f of fc.features) {
  const code = FOCUS[f.id] || (f.id === 'eh' ? 'eh' : null);
  const polys = projectFeature(f);
  if (!polys.length) continue;
  const largest = polys[0];
  const kept = polys.filter((p, i) => i === 0 || p.area > (code ? 0.004 : 0.05));
  const label = labelPoint(largest);
  if (!label) continue;
  const totalArea = kept.reduce((s, p) => s + p.area, 0);
  if (!code && totalArea < 0.3) continue;
  for (const p of kept) points += p.outer.length + p.holes.reduce((s, h) => s + h.length, 0);
  out.push({
    code,
    name: f.properties.name,
    kind: code === 'eh' ? 'disputed' : code ? 'focus' : 'context',
    showLabel: Boolean(code) || CONTEXT_LABELS.has(f.properties.name),
    km2: Math.round(geoArea(f) * 6371 * 6371),
    label,
    polys: kept.map((p) => [p.outer, ...p.holes].map((r) => r.flat())),
  });
}

const rot = projection.rotate();
const data = {
  source: 'Natural Earth 1:50m (public domain) via world-atlas 2.0.2; Western Sahara split at 27°40′N',
  projection: {
    type: 'conicEqualArea',
    parallels: [18, 38],
    rotate: rot,
    center: projection.center(),
    scale: projection.scale(),
    translate: projection.translate(),
  },
  extent: clip.map((p) => p.map(round)),
  features: out,
};
writeFileSync(join(root, 'assets/geo/mena.json'), JSON.stringify(data));
console.log(`features: ${out.length}, points: ${points}, extent: ${JSON.stringify(data.extent)}`);
console.log('focus:', out.filter((f) => f.kind !== 'context').map((f) => `${f.code}:${f.polys.length}`).join(' '));
