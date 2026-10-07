import { ARTICLES, BY_CODE, TERRITORY_BY_CODE, REGIONS, METRICS, valueOf } from './data/index.js';
import { homeView, countryView, aboutView, rankingTable, layerControl, legendText, tooltipHtml } from './views.js';
import { slug, esc } from './format.js';

const $ = (sel, root = document) => root.querySelector(sel);
const main = $('#content');
const stageEl = $('#stage');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
};

const state = {
  view: null,
  code: null,
  metric: METRICS[store.get('menapedia.metric')] ? store.get('menapedia.metric') : 'relief',
};
let stage = null;

// ───────────────────────────── theme ─────────────────────────────
const themeBtn = $('#theme-toggle');
const systemDark = matchMedia('(prefers-color-scheme: dark)');
function currentTheme() {
  return document.documentElement.dataset.theme || (systemDark.matches ? 'dark' : 'light');
}
function syncThemeButton() {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  themeBtn.setAttribute('aria-label', `Switch to ${next} theme`);
  themeBtn.dataset.mode = currentTheme();
}
const saved = store.get('menapedia.theme');
if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved;
syncThemeButton();
themeBtn.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  store.set('menapedia.theme', next);
  syncThemeButton();
  stage?.refreshTheme();
});
systemDark.addEventListener('change', () => { syncThemeButton(); stage?.refreshTheme(); });

// ───────────────────────────── HUD ─────────────────────────────
const layerForm = $('#layer-form');
layerForm.querySelector('.seg').innerHTML = layerControl(state.metric);
const legend = $('#layer-legend');
legend.textContent = legendText(state.metric);
layerForm.addEventListener('change', (e) => {
  if (e.target.name !== 'metric') return;
  setMetric(e.target.value);
});

function setMetric(metric) {
  state.metric = metric;
  store.set('menapedia.metric', metric);
  legend.textContent = legendText(metric);
  stage?.setMetric(metric, new Map(ARTICLES.map((c) => [c.code, valueOf(c, metric)])));
  const chartMetric = metric === 'relief' ? 'population' : metric;
  const home = $('#home-ranking');
  if (home) home.innerHTML = rankingTable(chartMetric);
  const country = $('#country-ranking');
  if (country) country.innerHTML = rankingTable(chartMetric, state.code);
}

const regionChips = $('#region-chips');
regionChips.innerHTML = REGIONS.map((r) => `<button type="button" class="chip clay-chip" data-region="${r.id}" aria-pressed="false" style="--tone: var(--clay-${r.id})"><span class="swatch" aria-hidden="true"></span>${r.name}</button>`).join('');

function focusRegion(id) {
  const active = stage?.regionFocus === id ? null : id;
  if (state.view !== 'home') location.hash = 'atlas';
  stage?.focusRegion(active);
  regionChips.querySelectorAll('[data-region]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.region === active)));
  if (active) stageEl.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
}

document.addEventListener('click', (e) => {
  const regionBtn = e.target.closest('[data-region]');
  if (regionBtn) { focusRegion(regionBtn.dataset.region); return; }

  const scrollLink = e.target.closest('[data-scroll]');
  if (scrollLink) {
    e.preventDefault();
    const target = document.getElementById(scrollLink.dataset.scroll);
    target?.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
    target?.querySelector('h2')?.setAttribute('tabindex', '-1');
    target?.querySelector('h2')?.focus({ preventScroll: true });
    return;
  }

  const flyBtn = e.target.closest('[data-fly]');
  if (flyBtn && stage) {
    stage.flyToLatLon(flyBtn.dataset.fly.split(',').map(Number));
    stageEl.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
  }
});

$('#btn-overview').addEventListener('click', () => {
  if (state.view === 'country') location.hash = 'atlas';
  else { stage?.focusRegion(null); regionChips.querySelectorAll('[aria-pressed]').forEach((b) => b.setAttribute('aria-pressed', 'false')); }
});

const motionBtn = $('#btn-motion');
let motionPaused = store.get('menapedia.motion') === 'paused' || reducedMotion.matches;
function syncMotion() {
  motionBtn.setAttribute('aria-pressed', String(motionPaused));
  motionBtn.querySelector('.label').textContent = motionPaused ? 'Motion off' : 'Motion on';
  stage?.setSwayPaused(motionPaused);
}
motionBtn.addEventListener('click', () => {
  motionPaused = !motionPaused;
  store.set('menapedia.motion', motionPaused ? 'paused' : 'on');
  syncMotion();
});
syncMotion();

// ───────────────────────────── search ─────────────────────────────
const searchInput = $('#search-input');
const fold = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i');
const searchIndex = [
  ...ARTICLES.map((c) => ({ code: c.code, keys: [c.name, c.short, c.alt, c.official, c.capital.name, ...(c.native || []).map((n) => n.text)].filter(Boolean).map(fold) })),
  { code: 'eh', keys: ['western sahara'] },
];
$('#country-list').innerHTML = ARTICLES.map((c) => `<option value="${esc(c.name)}"></option>`).join('');
function findCountry(q) {
  const f = fold(q.trim());
  if (!f) return null;
  return (searchIndex.find((e) => e.keys.some((k) => k === f))
    || searchIndex.find((e) => e.keys.some((k) => k.startsWith(f)))
    || searchIndex.find((e) => e.keys.some((k) => k.includes(f))))?.code ?? null;
}
$('#search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const code = findCountry(searchInput.value);
  const status = $('#search-status');
  if (code) {
    status.textContent = '';
    searchInput.value = '';
    searchInput.blur();
    location.hash = code;
  } else {
    status.textContent = `No country matches “${searchInput.value}”. Try a name or capital, such as Baku.`;
  }
});
searchInput.addEventListener('blur', () => { setTimeout(() => { $('#search-status').textContent = ''; }, 4000); });
searchInput.addEventListener('input', () => {
  // Choosing an option from the datalist fills the exact name: open it straight away.
  if (ARTICLES.some((c) => c.name === searchInput.value)) $('#search-form').requestSubmit();
  else $('#search-status').textContent = '';
});
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && !e.target.closest('input, textarea, [contenteditable]')) {
    e.preventDefault();
    searchInput.focus();
  }
});

// ───────────────────────────── routing ─────────────────────────────
function parseRoute() {
  const h = decodeURIComponent(location.hash.slice(1));
  if (BY_CODE[h] || TERRITORY_BY_CODE[h]) return { view: 'country', code: h };
  if (h === 'about') return { view: 'about' };
  if (h && document.getElementById(h)) return null; // an in-page anchor such as the skip link
  return { view: 'home' };
}

function render(route) {
  const { view, code } = route;
  const isNewPage = view !== state.view || code !== state.code;
  state.view = view;
  state.code = code ?? null;
  main.innerHTML = view === 'country' ? countryView(code, state.metric) : view === 'about' ? aboutView() : homeView(state.metric);
  document.body.dataset.view = view;
  const name = code ? (BY_CODE[code]?.name || 'Western Sahara') : null;
  document.title = view === 'country' ? `${name} · Menapedia` : view === 'about' ? 'Design notes · Menapedia' : 'Menapedia';
  stageEl.dataset.view = view;
  if (isNewPage) {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  syncStage();
  bindScrollSpy();
}

// Tell the stage how much of it the HUD covers, so the camera frames the map
// in the space that is left.
function updateInsets() {
  if (!stage) return;
  const sr = stageEl.getBoundingClientRect();
  let top = $('.topbar').offsetHeight;
  for (const el of [regionChips]) {
    if (el.offsetParent === null) continue;
    top = Math.max(top, el.getBoundingClientRect().bottom - sr.top + 6);
  }
  const bottom = sr.bottom - layerForm.getBoundingClientRect().top + 6;
  stage.setInsets({ top, bottom });
}
new ResizeObserver(() => updateInsets()).observe(stageEl);

function syncStage() {
  if (!stage) return;
  updateInsets();
  regionChips.querySelectorAll('[aria-pressed]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
  if (state.view === 'country') {
    stage.select(state.code);
    stage.setMarkers(state.code, markersFor(state.code));
  } else {
    stage.select(null);
    stage.setMarkers(null, []);
  }
}

function markersFor(code) {
  const c = BY_CODE[code] || TERRITORY_BY_CODE[code];
  const items = [{ name: c.capital.name.replace(' (administrative)', ''), at: c.capital.at, kind: 'capital' }];
  for (const city of c.cities || []) if (city.name !== c.capital.name) items.push({ name: city.name, at: city.at, kind: 'city' });
  for (const l of c.landmarks || []) items.push({ name: l.name, at: l.at, kind: 'landmark', id: `lm-${slug(l.name)}` });
  return items;
}

function navigate() {
  $('#search-status').textContent = '';
  const route = parseRoute();
  if (!route) return;
  const initial = state.view === null;
  const swap = () => render(route);
  const focusHeading = () => {
    const h1 = $('#page-title');
    if (h1 && document.activeElement !== searchInput) h1.focus({ preventScroll: true });
  };
  if (document.startViewTransition && !reducedMotion.matches && !initial) {
    document.startViewTransition(swap).finished.finally(focusHeading);
  } else {
    swap();
    if (!initial) focusHeading();
  }
}
window.addEventListener('hashchange', navigate);

// Contents highlighting for the current section.
let spy = null;
function bindScrollSpy() {
  spy?.disconnect();
  const links = [...main.querySelectorAll('.toc a[data-scroll]')];
  if (!links.length) return;
  spy = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach((a) => {
        const on = a.dataset.scroll === entry.target.id;
        a.classList.toggle('is-current', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-35% 0px -60% 0px' });
  links.forEach((a) => { const t = document.getElementById(a.dataset.scroll); if (t) spy.observe(t); });
}

// ───────────────────────────── boot ─────────────────────────────
navigate();

async function bootStage() {
  try {
    const [{ MapStage }, geo] = await Promise.all([
      import('./stage.js'),
      fetch('assets/geo/mena.json').then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }),
    ]);
    stage = new MapStage($('#stage-canvas'), geo, ARTICLES, { describe: tooltipHtml });
    if (stage.failed) throw new Error('WebGL unavailable');
    stage.addEventListener('select', (e) => { location.hash = e.detail.code; });
    stage.addEventListener('marker', (e) => {
      const el = document.getElementById(e.detail.id);
      if (!el) return;
      el.scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'center' });
      el.classList.remove('is-flash');
      void el.offsetWidth;
      el.classList.add('is-flash');
    });
    setMetric(state.metric);
    syncMotion();
    syncStage();
    stageEl.classList.add('is-ready');
  } catch (err) {
    console.error(err);
    stageEl.classList.add('is-failed');
    $('#stage-fallback').hidden = false;
  }
}
bootStage();
