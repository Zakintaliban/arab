import { FIGURES, FIGURE_BY_ID, RELIGIONS, RELIGION_BY_ID, countriesOf } from './data/index.js';
import { homeView, figureView, religionView, religionsView, countryView, aboutView, religionChips, filterFigures } from './views.js';
import { ARTICLES, BY_CODE } from '../js/data/index.js';
import { esc } from '../js/format.js';

const $ = (sel, root = document) => root.querySelector(sel);
const main = $('#content');
const stageEl = $('#stage');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const smooth = () => (reducedMotion.matches ? 'auto' : 'smooth');

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } },
};

const state = { view: null, id: null, religion: '' };
let stage = null;

const countryName = (code) => BY_CODE[code]?.name || (code === 'eh' ? 'Western Sahara' : code);

// ───────────────────────────── theme and motion ─────────────────────────────
const themeBtn = $('#theme-toggle');
const systemDark = matchMedia('(prefers-color-scheme: dark)');
const currentTheme = () => document.documentElement.dataset.theme || (systemDark.matches ? 'dark' : 'light');
function syncThemeButton() {
  themeBtn.setAttribute('aria-label', `Switch to ${currentTheme() === 'dark' ? 'light' : 'dark'} theme`);
  themeBtn.dataset.mode = currentTheme();
}
const savedTheme = store.get('prophets.theme');
if (savedTheme === 'light' || savedTheme === 'dark') document.documentElement.dataset.theme = savedTheme;
syncThemeButton();
themeBtn.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  store.set('prophets.theme', next);
  syncThemeButton();
  stage?.refreshTheme();
});
systemDark.addEventListener('change', () => { syncThemeButton(); stage?.refreshTheme(); });

const motionBtn = $('#btn-motion');
let motionPaused = store.get('prophets.motion') === 'paused' || reducedMotion.matches;
function syncMotion() {
  motionBtn.setAttribute('aria-pressed', String(motionPaused));
  motionBtn.querySelector('.label').textContent = motionPaused ? 'Motion off' : 'Motion on';
  stage?.setSwayPaused(motionPaused);
}
motionBtn.addEventListener('click', () => {
  motionPaused = !motionPaused;
  store.set('prophets.motion', motionPaused ? 'paused' : 'on');
  syncMotion();
});
syncMotion();

$('#btn-overview').addEventListener('click', () => {
  if (state.view === 'home') stage?.select(null);
  else location.hash = 'atlas';
});

// ───────────────────────────── religion filter ─────────────────────────────
const chips = $('#religion-chips');
function setReligion(id) {
  state.religion = state.religion === id ? '' : id;
  chips.innerHTML = religionChips(state.religion);
  if (state.view !== 'home') { location.hash = 'atlas'; return; }
  main.innerHTML = homeView(state.religion);
  syncStage();
}
chips.innerHTML = religionChips(state.religion);

document.addEventListener('click', (e) => {
  const rel = e.target.closest('[data-religion]');
  if (rel) { setReligion(rel.dataset.religion); return; }

  const scrollLink = e.target.closest('[data-scroll]');
  if (scrollLink) {
    e.preventDefault();
    const target = document.getElementById(scrollLink.dataset.scroll);
    target?.scrollIntoView({ behavior: smooth(), block: 'start' });
    const h2 = target?.querySelector('h2');
    h2?.setAttribute('tabindex', '-1');
    h2?.focus({ preventScroll: true });
    return;
  }

  const flyBtn = e.target.closest('[data-fly]');
  if (flyBtn && stage) {
    stage.flyToLatLon(flyBtn.dataset.fly.split(',').map(Number));
    stageEl.scrollIntoView({ behavior: smooth(), block: 'start' });
  }
});

// ───────────────────────────── search ─────────────────────────────
const searchInput = $('#search-input');
const status = $('#search-status');
const fold = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[ʿ'’`]/g, '');
const searchIndex = [
  ...FIGURES.map((f) => ({ hash: f.id, keys: [f.id, f.title, ...f.names.map((n) => n[1]), ...f.scripts.map((s) => s[1]), ...f.aliases].map(fold) })),
  ...RELIGIONS.map((r) => ({ hash: `religion-${r.id}`, keys: [r.name, r.id].map(fold) })),
];
$('#figure-list').innerHTML = [...FIGURES.map((f) => f.title), ...RELIGIONS.map((r) => r.name)].map((t) => `<option value="${esc(t)}"></option>`).join('');
function findMatch(q) {
  const f = fold(q.trim());
  if (!f) return null;
  return (searchIndex.find((e) => e.keys.includes(f))
    || searchIndex.find((e) => e.keys.some((k) => k.startsWith(f)))
    || searchIndex.find((e) => e.keys.some((k) => k.includes(f))))?.hash ?? null;
}
$('#search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const hash = findMatch(searchInput.value);
  if (hash) {
    status.textContent = '';
    searchInput.value = '';
    searchInput.blur();
    location.hash = hash;
  } else {
    status.textContent = `Nothing matches “${searchInput.value}”. Try another spelling, such as Ibrahim, Abraham or Avraham.`;
  }
});
searchInput.addEventListener('input', () => {
  const exact = [...FIGURES.map((f) => f.title), ...RELIGIONS.map((r) => r.name)].includes(searchInput.value);
  if (exact) $('#search-form').requestSubmit();
  else status.textContent = '';
});
searchInput.addEventListener('blur', () => { setTimeout(() => { status.textContent = ''; }, 4000); });
document.addEventListener('keydown', (e) => {
  if (e.key === '/' && !e.target.closest('input, textarea, [contenteditable]')) {
    e.preventDefault();
    searchInput.focus();
  }
});

// ───────────────────────────── routing ─────────────────────────────
function parseRoute() {
  const h = decodeURIComponent(location.hash.slice(1));
  if (FIGURE_BY_ID[h]) return { view: 'figure', id: h };
  if (h.startsWith('religion-') && RELIGION_BY_ID[h.slice(9)]) return { view: 'religion', id: h.slice(9) };
  if (h.startsWith('in-') && (BY_CODE[h.slice(3)] || h === 'in-eh')) return { view: 'country', id: h.slice(3) };
  if (h === 'religions') return { view: 'religions' };
  if (h === 'about') return { view: 'about' };
  if (h && document.getElementById(h)) return null; // in-page anchor, such as the skip link
  return { view: 'home' };
}

function render({ view, id }) {
  const isNewPage = view !== state.view || id !== state.id;
  state.view = view;
  state.id = id ?? null;
  main.innerHTML = view === 'figure' ? figureView(id)
    : view === 'religion' ? religionView(id)
      : view === 'religions' ? religionsView()
        : view === 'country' ? countryView(id, countryName(id))
          : view === 'about' ? aboutView() : homeView(state.religion);
  document.body.dataset.view = view;
  stageEl.dataset.view = view;
  document.title = view === 'figure' ? `${FIGURE_BY_ID[id].title} · Prophets Atlas`
    : view === 'religion' ? `${RELIGION_BY_ID[id].name} · Prophets Atlas`
      : view === 'country' ? `${countryName(id)} · Prophets Atlas`
        : view === 'religions' ? 'Religions · Prophets Atlas'
          : view === 'about' ? 'About · Prophets Atlas' : 'Prophets Atlas';
  if (isNewPage) window.scrollTo({ top: 0, behavior: 'auto' });
  syncStage();
  bindScrollSpy();
}

function navigate() {
  status.textContent = '';
  const route = parseRoute();
  if (!route) return;
  const initial = state.view === null;
  const focusHeading = () => {
    const h1 = $('#page-title');
    if (h1 && document.activeElement !== searchInput) h1.focus({ preventScroll: true });
  };
  if (document.startViewTransition && !reducedMotion.matches && !initial) {
    document.startViewTransition(() => render(route)).finished.finally(focusHeading);
  } else {
    render(route);
    if (!initial) focusHeading();
  }
}
window.addEventListener('hashchange', navigate);

// ───────────────────────────── map ─────────────────────────────
function updateInsets() {
  if (!stage) return;
  const sr = stageEl.getBoundingClientRect();
  let top = $('.topbar').offsetHeight;
  if (chips.offsetParent !== null) top = Math.max(top, chips.getBoundingClientRect().bottom - sr.top + 6);
  const bottom = sr.bottom - $('#map-key').getBoundingClientRect().top + 6;
  stage.setInsets({ top, bottom });
}
new ResizeObserver(() => updateInsets()).observe(stageEl);

function showPlaces(places, withRoute) {
  stage.highlight([...new Set(places.flatMap(countriesOf))]);
  stage.setMarkers(null, places.map((p, i) => ({
    name: p.name, at: p.at, kind: p.kind, owner: countriesOf(p)[0], id: `place-${i}`,
    label: `Show in the article: ${p.name}`, priority: p.kind === 'born' ? 1200 : 1000,
  })));
  const steps = places.filter((p) => p.step).sort((a, b) => a.step - b.step);
  stage.setRoute(withRoute ? steps.map((p) => p.at) : null);
  stage.flyToPoints(places.map((p) => p.at));
}

function figurePins(figures) {
  return figures.map((f) => ({
    name: f.short, at: f.primary.at, kind: 'figure', owner: countriesOf(f.primary)[0], id: `fig-${f.id}`,
    label: `Open entry: ${f.title}`, priority: f.group === 'quran' ? 1100 - f.n : 900,
  }));
}

function syncStage() {
  if (!stage) return;
  chips.innerHTML = religionChips(state.religion);
  updateInsets();
  if (state.view === 'figure') {
    showPlaces(FIGURE_BY_ID[state.id].places, true);
  } else if (state.view === 'religion') {
    showPlaces(RELIGION_BY_ID[state.id].places, false);
  } else if (state.view === 'country') {
    const code = state.id;
    const here = FIGURES.filter((f) => f.places.some((p) => countriesOf(p).includes(code)));
    stage.setRoute(null);
    stage.select(code);
    stage.setMarkers(code, here.map((f) => {
      const p = f.places.find((pl) => countriesOf(pl).includes(code));
      return { ...figurePins([f])[0], at: p.at, owner: code };
    }));
  } else {
    stage.setRoute(null);
    stage.select(null);
    stage.setMarkers(null, figurePins(filterFigures(state.religion)));
  }
}

function describe(code) {
  const n = FIGURES.filter((f) => f.places.some((p) => countriesOf(p).includes(code))).length;
  return `<span><strong class="tt__name">${esc(countryName(code))}</strong><span class="tt__line">${n ? `${n} figure${n > 1 ? 's' : ''} linked · select to list` : 'No figures linked'}</span></span>`;
}

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

(async () => {
  try {
    const [{ MapStage }, geo] = await Promise.all([
      import('../js/stage.js'),
      fetch(new URL('../assets/geo/mena.json', import.meta.url)).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }),
    ]);
    stage = new MapStage($('#stage-canvas'), geo, ARTICLES, { describe, labelHint: 'Show prophets linked to' });
    if (stage.failed) throw new Error('WebGL unavailable');
    stage.addEventListener('select', (e) => { location.hash = `in-${e.detail.code}`; });
    stage.addEventListener('marker', (e) => {
      const id = e.detail.id;
      if (id.startsWith('fig-')) { location.hash = id.slice(4); return; }
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: smooth(), block: 'center' });
      el.classList.remove('is-flash');
      void el.offsetWidth;
      el.classList.add('is-flash');
    });
    syncMotion();
    syncStage();
    stageEl.classList.add('is-ready');
  } catch (err) {
    console.error(err);
    stageEl.classList.add('is-failed');
    $('#stage-fallback').hidden = false;
  }
})();
