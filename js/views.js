// HTML for the three views. All article text comes from js/data and is
// escaped through prose()/esc() before it reaches the DOM.
import { ARTICLES, BY_CODE, REGIONS, REGION_BY_ID, METRICS, TOTALS, TERRITORY_BY_CODE, valueOf, rankOf } from './data/index.js';
import { esc, prose, people, km2, usdBillions, usd, density, metricShort, ordinal, slug } from './format.js';

const flag = (code, cls = 'flag') => `<img class="${cls}" src="assets/flags/${code}.svg" alt="" width="40" height="30" loading="lazy" decoding="async">`;
const nativeNames = (c) => (c.native || []).map((n) => `<span lang="${n.lang}" dir="auto">${esc(n.text)}</span>`).join('<span class="sep" aria-hidden="true"> · </span>');
const countryLink = (code) => {
  const c = BY_CODE[code];
  return c ? `<a href="#${code}">${esc(c.name)}</a>` : TERRITORY_BY_CODE[code] ? `<a href="#${code}">Western Sahara</a>` : esc(code);
};

// ───────────────────────────── shared pieces ─────────────────────────────
function countryCard(c) {
  return `<li>
    <a class="ccard clay" href="#${c.code}" style="--tone: var(--clay-${c.region})">
      ${flag(c.code, 'ccard__flag')}
      <span class="ccard__name">${esc(c.short || c.name)}</span>
      <span class="ccard__meta">${esc(c.capital.name.replace(' (administrative)', ''))}<br>${metricShort('population', c.population)} people</span>
    </a>
  </li>`;
}

export function rankingTable(metric, highlight = null) {
  const m = METRICS[metric];
  const rows = ARTICLES.map((c) => ({ c, v: valueOf(c, metric) }))
    .sort((a, b) => (b.v ?? -1) - (a.v ?? -1));
  const max = Math.max(...rows.map((r) => r.v ?? 0));
  const missing = rows.filter((r) => r.v == null).map((r) => r.c.name);
  return `<figure class="rank">
    <table class="rank__table">
      <caption>
        <span class="rank__title">${esc(m.label)}, all ${rows.length} countries</span>
        <span class="rank__sub">${rankCaption(metric)}</span>
      </caption>
      <thead><tr><th scope="col">Rank</th><th scope="col">Country</th><th scope="col"><span class="visually-hidden">Bar</span></th><th scope="col">${esc(m.short)}</th></tr></thead>
      <tbody>
      ${rows.map((r, i) => `<tr class="${r.c.code === highlight ? 'is-current' : ''}${r.v == null ? ' is-missing' : ''}">
          <td class="rank__n">${r.v == null ? '–' : i + 1}</td>
          <th scope="row"><a href="#${r.c.code}">${esc(r.c.short || r.c.name)}</a></th>
          <td class="rank__barcell" aria-hidden="true"><span class="rank__bar" style="--w:${r.v == null ? 0 : Math.max(0.4, (r.v / max) * 100)}%"></span></td>
          <td class="rank__v">${metricShort(metric, r.v)}</td>
        </tr>`).join('')}
      </tbody>
    </table>
    ${missing.length ? `<figcaption class="note">No reliable figure for ${esc(missing.join(', '))}.</figcaption>` : ''}
  </figure>`;
}

function rankCaption(metric) {
  switch (metric) {
    case 'population': return 'Mid-2024 estimates, rounded.';
    case 'area': return 'Total area in square kilometres.';
    case 'gdp': return 'Nominal GDP in US dollars, 2024 IMF estimates, rounded.';
    case 'gdpPerCapita': return 'Nominal GDP divided by population, 2024.';
    case 'density': return 'People per square kilometre of total area.';
    default: return '';
  }
}

export function layerControl(current) {
  return Object.entries(METRICS).map(([key, m]) => `
    <label class="seg__opt">
      <input type="radio" name="metric" id="metric-${key}" value="${key}" ${key === current ? 'checked' : ''}>
      <span>${esc(m.short)}</span>
    </label>`).join('');
}

export function legendText(metric) {
  if (metric === 'relief') return 'Every article country at the same height. Choose a layer to raise them by data.';
  const top = ARTICLES.map((c) => ({ c, v: valueOf(c, metric) })).filter((r) => r.v != null).sort((a, b) => b.v - a.v)[0];
  return `${METRICS[metric].describe}. Tallest: ${top.c.short || top.c.name}, ${metricShort(metric, top.v)}.`;
}

export function tooltipHtml(code, metric) {
  const c = BY_CODE[code];
  if (!c) {
    return `<strong class="tt__name">Western Sahara</strong><span class="tt__line">Disputed territory</span>`;
  }
  const v = valueOf(c, metric);
  const line = metric === 'relief'
    ? `${esc(c.capital.name)} · ${metricShort('population', c.population)} people`
    : `${esc(METRICS[metric].short)}: ${metricShort(metric, v)}${v != null ? ` · ${ordinal(rankOf(c, metric))} of ${ARTICLES.length}` : ''}`;
  return `${flag(code, 'tt__flag')}<span><strong class="tt__name">${esc(c.name)}</strong><span class="tt__line">${line}</span></span>`;
}

// ───────────────────────────── home ─────────────────────────────
export function homeView(metric) {
  const featured = ARTICLES.filter((c) => c.featured);
  const chartMetric = metric === 'relief' ? 'population' : metric;
  return `
  <article class="folio">
    <header class="folio__head">
      <p class="eyebrow">An illustrated encyclopedia · ${TOTALS.countries} countries</p>
      <h1 id="page-title" tabindex="-1">The Middle East <span class="amp">&amp;</span> North&nbsp;Africa</h1>
      <p class="lede">From the Atlantic coast of Morocco to Iran's borders with Afghanistan and Pakistan, the region spans nearly 8,000&nbsp;km of mountains, river valleys, seas and desert. It is where farming, cities, writing and three world religions began. Pick a country on the clay map above, or browse the articles below.</p>
      <dl class="wells">
        <div class="well"><dt>Countries</dt><dd>${TOTALS.countries}</dd></div>
        <div class="well"><dt>People</dt><dd>${(TOTALS.population / 1e6).toFixed(0)} million</dd></div>
        <div class="well"><dt>Land area</dt><dd>${(TOTALS.area / 1e6).toFixed(1)} million km²</dd></div>
        <div class="well"><dt>Regions</dt><dd>${REGIONS.length}</dd></div>
      </dl>
    </header>

    <section class="block" aria-labelledby="h-featured">
      <h2 id="h-featured">In depth: Turkey, Iran and Azerbaijan</h2>
      <p class="block__intro">Three neighbours on the region's northern rim, each with an extended article: timelines, major cities, landmarks, cuisine and more.</p>
      <ul class="feature-grid" role="list">
        ${featured.map((c) => `<li>
          <a class="fcard clay" href="#${c.code}" style="--tone: var(--clay-${c.region})">
            <span class="fcard__top">${flag(c.code, 'fcard__flag')}<span class="badge">Extended article</span></span>
            <span class="fcard__name">${esc(c.name)}</span>
            <span class="fcard__native">${nativeNames(c)}</span>
            <span class="fcard__lead">${prose(c.lead.split('. ').slice(0, 2).join('. '))}.</span>
            <span class="fcard__stats"><span>${people(c.population)}</span><span>${km2(c.area)}</span></span>
          </a>
        </li>`).join('')}
      </ul>
    </section>

    ${REGIONS.map((r) => {
      const list = ARTICLES.filter((c) => c.region === r.id);
      return `<section class="block region" aria-labelledby="h-${r.id}" style="--tone: var(--clay-${r.id})">
        <div class="region__head">
          <h2 id="h-${r.id}"><span class="swatch" aria-hidden="true"></span>${esc(r.name)}</h2>
          <p class="region__gloss">${esc(r.gloss)}</p>
          <button type="button" class="chip clay-chip" data-region="${r.id}">Show on map</button>
        </div>
        <p class="block__intro">${prose(r.blurb)}</p>
        <ul class="card-grid" role="list">${list.map(countryCard).join('')}</ul>
        ${r.id === 'maghreb' ? `<p class="note">Also on the map: <a href="#eh">Western Sahara</a>, a disputed territory.</p>` : ''}
      </section>`;
    }).join('')}

    <section class="block" aria-labelledby="h-compare">
      <h2 id="h-compare">How the countries compare</h2>
      <p class="block__intro">This ranking follows the layer chosen on the map. Switch layers above to compare population, area, economy and density.</p>
      <div id="home-ranking">${rankingTable(chartMetric)}</div>
    </section>

    <section class="block prose-block" aria-labelledby="h-define">
      <h2 id="h-define">What counts as “MENA”?</h2>
      <p>There is no single definition. International organisations usually group the Arab countries of North Africa and South-West Asia with Iran and Israel; some add Turkey, and the Arab League also includes Sudan, Mauritania, Somalia, Djibouti and the Comoros. This atlas covers the 20 core countries of the Middle East and North Africa, adds Sudan and Mauritania from the wider Arab world, and extends north to Turkey and Azerbaijan in the South Caucasus.</p>
      <p>Map outlines follow Natural Earth's depiction of the boundaries actually administered on the ground. They do not imply any position on disputed territory. Western Sahara is shown as a disputed territory; the Golan Heights, internationally recognised as Syrian territory, appear within Israel's outline because Israel administers them.</p>
    </section>
  </article>`;
}

// ───────────────────────────── country ─────────────────────────────
function infobox(c) {
  const rows = [
    ['Capital', `${esc(c.capital.name)}${c.capitalNote ? `<span class="ib__note">${prose(c.capitalNote)}</span>` : ''}`],
    c.largestCity && c.largestCity !== c.capital.name ? ['Largest city', esc(c.largestCity)] : null,
    ['Official language' + (c.languages.length > 1 ? 's' : ''), c.languages.map(esc).join('<br>')],
    ['Government', esc(c.government)],
    ...c.formed.map(([what, when]) => [esc(what), esc(when)]),
    ['Area', `${km2(c.area)}${c.areaNote ? `<span class="ib__note">${prose(c.areaNote)}</span>` : ''}`],
    ['Population', `${people(c.population)}<span class="ib__note">${esc(c.popNote)}</span>`],
    ['Density', density(c.density)],
    ['GDP (nominal)', `${usdBillions(c.gdp)}${c.gdp == null ? '<span class="ib__note">No reliable recent estimate</span>' : '<span class="ib__note">2024 IMF estimate</span>'}`],
    ['GDP per person', usd(c.gdpPerCapita)],
    ['Currency', esc(c.currency)],
    c.subdivisions ? ['Divisions', esc(c.subdivisions)] : null,
    ['Time zone', esc(c.timezone)],
    ['Calling code', esc(c.calling)],
    ['Internet domain', esc(c.tld)],
    ['Demonym', esc(c.demonym)],
  ].filter(Boolean);
  return `<aside class="infobox clay" aria-labelledby="ib-title" style="--tone: var(--clay-${c.region})">
    <figure class="infobox__flag">
      <img src="assets/flags/${c.code}.svg" alt="Flag of ${esc(c.name)}" width="240" height="180">
    </figure>
    <h2 class="infobox__title" id="ib-title">${esc(c.official)}</h2>
    <p class="infobox__native">${nativeNames(c)}</p>
    <dl class="infobox__rows">
      ${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
    </dl>
  </aside>`;
}

function rankWells(c) {
  const list = ['population', 'area', 'gdp', 'gdpPerCapita', 'density'];
  return `<dl class="wells wells--ranks">${list.map((m) => {
    const r = rankOf(c, m);
    return `<div class="well"><dt>${esc(METRICS[m].short)}</dt><dd>${r ? `${ordinal(r)}<span class="well__of"> of ${ARTICLES.length}</span>` : '<span class="well__of">no data</span>'}</dd></div>`;
  }).join('')}</dl>`;
}

function landmarksBlock(c) {
  if (!c.landmarks?.length) return '';
  return `<section class="block" id="sec-landmarks" aria-labelledby="h-landmarks">
    <h2 id="h-landmarks">Landmarks</h2>
    <ul class="landmarks" role="list">
      ${c.landmarks.map((l) => `<li class="landmark" id="lm-${slug(l.name)}">
        <div class="landmark__head">
          <h3>${esc(l.name)}</h3>
          ${l.unesco ? `<span class="badge badge--unesco" title="Inscribed on the UNESCO World Heritage List">UNESCO ${l.unesco}</span>` : ''}
        </div>
        ${l.note ? `<p>${prose(l.note)}</p>` : ''}
        <button type="button" class="linkbtn" data-fly="${l.at.join(',')}">Show on map</button>
      </li>`).join('')}
    </ul>
  </section>`;
}

function citiesBlock(c) {
  if (!c.cityStats) return '';
  const max = Math.max(...c.cityStats.rows.map((r) => r[1]));
  return `<section class="block" id="sec-cities" aria-labelledby="h-cities">
    <h2 id="h-cities">Largest cities</h2>
    <figure class="rank rank--cities">
      <table class="rank__table">
        <caption><span class="rank__sub">${esc(c.cityStats.note)}</span></caption>
        <thead><tr><th scope="col">City</th><th scope="col"><span class="visually-hidden">Bar</span></th><th scope="col">Population</th></tr></thead>
        <tbody>${c.cityStats.rows.map(([name, pop]) => `<tr>
          <th scope="row">${esc(name)}</th>
          <td class="rank__barcell" aria-hidden="true"><span class="rank__bar" style="--w:${(pop / max) * 100}%"></span></td>
          <td class="rank__v">${metricShort('population', pop)}</td>
        </tr>`).join('')}</tbody>
      </table>
    </figure>
  </section>`;
}

function timelineBlock(c) {
  if (!c.timeline) return '';
  return `<section class="block" id="sec-timeline" aria-labelledby="h-timeline">
    <h2 id="h-timeline">Timeline</h2>
    <ol class="timeline">
      ${c.timeline.map(([when, what]) => `<li><span class="timeline__when">${esc(when)}</span><span class="timeline__what">${prose(what)}</span></li>`).join('')}
    </ol>
  </section>`;
}

function didYouKnowBlock(c) {
  const items = c.didYouKnow?.length ? c.didYouKnow : c.facts;
  if (!items?.length) return '';
  return `<section class="block" id="sec-facts" aria-labelledby="h-facts">
    <h2 id="h-facts">${c.didYouKnow ? 'Did you know?' : 'Notable facts'}</h2>
    <ul class="facts" role="list">${items.map((f) => `<li class="fact">${prose(f)}</li>`).join('')}</ul>
  </section>`;
}

export function countryView(code, metric) {
  if (TERRITORY_BY_CODE[code]) return territoryView(TERRITORY_BY_CODE[code]);
  const c = BY_CODE[code];
  const region = REGION_BY_ID[c.region];
  const sections = c.sections.map((s, i) => ({ ...s, id: `sec-${s.id || slug(s.title)}`, i }));
  const extras = [
    c.timeline && ['sec-timeline', 'Timeline'],
    c.cityStats && ['sec-cities', 'Largest cities'],
    c.landmarks?.length && ['sec-landmarks', 'Landmarks'],
    (c.didYouKnow?.length || c.facts?.length) && ['sec-facts', c.didYouKnow ? 'Did you know?' : 'Notable facts'],
    ['sec-compare', 'Compared with the region'],
  ].filter(Boolean);
  const toc = [...sections.map((s) => [s.id, s.title]), ...extras];
  const idx = ARTICLES.findIndex((a) => a.code === code);
  const prev = ARTICLES[(idx - 1 + ARTICLES.length) % ARTICLES.length];
  const next = ARTICLES[(idx + 1) % ARTICLES.length];
  const neighbours = c.borders.map((b) => (BY_CODE[b] || TERRITORY_BY_CODE[b]
    ? `<li><a class="chip clay-chip" href="#${b}">${esc(BY_CODE[b]?.name || 'Western Sahara')}</a></li>`
    : `<li><span class="chip chip--plain">${esc(b)}</span></li>`)).join('');
  const chartMetric = metric === 'relief' ? 'population' : metric;

  return `
  <article class="folio folio--country" style="--tone: var(--clay-${c.region})">
    <header class="article-head">
      <p class="eyebrow"><a href="#atlas">Atlas</a> <span aria-hidden="true">/</span> ${esc(region.name)}${c.featured ? ' <span class="badge">Extended article</span>' : ''}</p>
      <h1 id="page-title" tabindex="-1">${esc(c.name)}${c.alt ? ` <span class="alt">(${esc(c.alt)})</span>` : ''}</h1>
      <p class="native">${nativeNames(c)}</p>
    </header>
    <div class="article-grid">
      <nav class="toc" aria-label="Contents">
        <p class="toc__title">Contents</p>
        <ol>${toc.map(([id, title]) => `<li><a href="#${id}" data-scroll="${id}">${esc(title)}</a></li>`).join('')}</ol>
      </nav>
      <div class="article-body">
        <p class="lead">${prose(c.lead)}</p>
        ${infobox(c)}
        ${sections.map((s) => `<section class="block prose-block" id="${s.id}" aria-labelledby="h-${s.id}">
          <h2 id="h-${s.id}">${esc(s.title)}</h2>
          ${s.paras.map((p) => `<p>${prose(p)}</p>`).join('')}
        </section>`).join('')}
        ${timelineBlock(c)}
        ${citiesBlock(c)}
        ${landmarksBlock(c)}
        ${didYouKnowBlock(c)}
        <section class="block" id="sec-compare" aria-labelledby="h-compare">
          <h2 id="h-compare">Compared with the region</h2>
          <p class="block__intro">${esc(c.name)}'s rank among the ${ARTICLES.length} countries in this atlas.</p>
          ${rankWells(c)}
          <div id="country-ranking">${rankingTable(chartMetric, code)}</div>
        </section>
        <section class="block" aria-labelledby="h-borders">
          <h2 id="h-borders">Borders</h2>
          <ul class="chips" role="list">${neighbours}</ul>
        </section>
        <nav class="pager" aria-label="More countries">
          <a class="pager__link chip clay-chip" href="#${prev.code}" rel="prev"><span aria-hidden="true">←</span> ${esc(prev.short || prev.name)}</a>
          <a class="pager__link chip clay-chip" href="#${next.code}" rel="next">${esc(next.short || next.name)} <span aria-hidden="true">→</span></a>
        </nav>
      </div>
    </div>
  </article>`;
}

function territoryView(t) {
  return `
  <article class="folio folio--country" style="--tone: var(--map-disputed)">
    <header class="article-head">
      <p class="eyebrow"><a href="#atlas">Atlas</a> <span aria-hidden="true">/</span> Disputed territory</p>
      <h1 id="page-title" tabindex="-1">${esc(t.name)}</h1>
    </header>
    <div class="article-grid article-grid--plain">
      <div class="article-body">
        <p class="lead">${prose(t.lead)}</p>
        <dl class="wells">
          <div class="well"><dt>Area</dt><dd>${km2(t.area)}</dd></div>
          <div class="well"><dt>Population</dt><dd>${people(t.population)}</dd></div>
          <div class="well"><dt>Largest city</dt><dd>${esc(t.largestCity)}</dd></div>
        </dl>
        ${t.sections.map((s) => `<section class="block prose-block"><h2>${esc(s.title)}</h2>${s.paras.map((p) => `<p>${prose(p)}</p>`).join('')}</section>`).join('')}
        <p class="note">Neighbouring articles: ${['ma', 'dz', 'mr'].map(countryLink).join(', ')}.</p>
      </div>
    </div>
  </article>`;
}

// ───────────────────────────── design notes ─────────────────────────────
export function aboutView() {
  return `
  <article class="folio">
    <header class="folio__head">
      <p class="eyebrow">About this atlas</p>
      <h1 id="page-title" tabindex="-1">Design notes</h1>
      <p class="lede">Menapedia layers four visual styles, and gives each one a single job. The research behind each choice is summarised below, with sources.</p>
    </header>

    <section class="block" aria-labelledby="h-styles">
      <h2 id="h-styles">Four styles, four jobs</h2>
      <div class="specimens">
        <div class="specimen">
          <div class="specimen__demo specimen__demo--3d" aria-hidden="true"><span class="cube"><span></span><span></span><span></span></span></div>
          <h3>3D: the map is the thesis</h3>
          <p>Countries are extruded clay tiles on a sea-glaze slab, lit from the top left so shadows fall to the bottom right. Height can carry data (population, area, GDP, density), turning the map into a prism map. Like the GitHub and Stripe globes, it renders without image textures and only redraws when something moves.</p>
        </div>
        <div class="specimen">
          <div class="specimen__demo" aria-hidden="true"><span class="clay clay-demo">Turkey</span></div>
          <h3>Claymorphism: things you can touch</h3>
          <p>Country cards, chips and the infobox use the clay recipe: large radii, a soft outer shadow, a light inner highlight at the top left and a darker inner shade at the bottom right. Clay reads as friendly and tactile, and works best with bright pastel colours, which is why it is kept for objects rather than reading surfaces.</p>
        </div>
        <div class="specimen">
          <div class="specimen__demo specimen__demo--glass" aria-hidden="true"><span class="glass glass-demo">Population · Area · GDP</span></div>
          <h3>Glassmorphism: controls floating over 3D</h3>
          <p>The header, map controls and tooltips are frosted glass, because they sit over a moving, colourful scene: blur keeps the context visible while separating the layer. Fill opacity is kept high and text dark for contrast, and glass turns solid for people who ask the system to reduce transparency.</p>
        </div>
        <div class="specimen">
          <div class="specimen__demo" aria-hidden="true"><span class="well well--demo"><span>85.7 M</span></span></div>
          <h3>Neumorphism: read-only wells and the layer switch</h3>
          <p>Soft UI has a known contrast problem: its shapes are the same colour as the page, so boundaries often fail WCAG's 3:1 rule for components. Here it is limited to recessed number wells and the track of the layer switch, and every well also gets a visible border.</p>
        </div>
      </div>
    </section>

    <section class="block prose-block" aria-labelledby="h-palette">
      <h2 id="h-palette">Palette and type</h2>
      <p>The colours come from glazed tiles of the region: terracotta and saffron for North Africa and the Nile, Tyrian purple for the Levant (the dye was made in Phoenician Tyre), turquoise for Arabia's seas and Persian cobalt for Anatolia, Iran and the Caucasus, as in İznik and Isfahan tilework. Headings are set in Reem Kufi, a geometric typeface drawn from Kufic calligraphy; body text uses Readex Pro, which covers Arabic, Persian and the Turkish and Azerbaijani alphabets.</p>
    </section>

    <section class="block prose-block" aria-labelledby="h-a11y">
      <h2 id="h-a11y">Accessibility</h2>
      <p>Everything on the map is also available as text: country names on the map are buttons, every article is reachable from the lists and search, and each chart is a real table. The map can be turned with the arrow keys and zoomed with plus and minus. Motion stops for people who prefer reduced motion, and the slow idle sway can be paused from the map controls.</p>
    </section>

    <section class="block prose-block" aria-labelledby="h-sources">
      <h2 id="h-sources">Research and references</h2>
      <ul class="sources">
        <li><a href="https://github.blog/engineering/how-we-built-the-github-globe/" rel="noopener">How we built the GitHub globe</a>: layered scene, no textures, performance-first.</li>
        <li><a href="https://stripe.com/blog/globe" rel="noopener">Stripe: designing an interactive globe</a>: three-layer composition and restraint.</li>
        <li><a href="https://github.com/vasturiano/globe.gl" rel="noopener">globe.gl</a>: extruded and hexed country polygons as data layers.</li>
        <li><a href="https://uxdesign.cc/claymorphism-in-user-interfaces-1757fabaa377" rel="noopener">Claymorphism in user interfaces</a> and <a href="https://blog.logrocket.com/implementing-claymorphism-css" rel="noopener">implementing claymorphism with CSS</a>.</li>
        <li><a href="https://axesslab.com/?p=5111" rel="noopener">Glassmorphism meets accessibility</a>: contrast, blur strength and reduced transparency.</li>
        <li><a href="https://www.setproduct.com/blog/neumorphism-design-guide" rel="noopener">How neumorphism works and where it fails</a>: the WCAG 1.4.11 problem.</li>
        <li><a href="https://pixso.net/articles/glassmorphism-vs-neumorphism-vs-claymorphism/" rel="noopener">Glassmorphism vs neumorphism vs claymorphism</a>: when to use each.</li>
      </ul>
    </section>

    <section class="block prose-block" aria-labelledby="h-data">
      <h2 id="h-data">Data and caveats</h2>
      <p>Country outlines are Natural Earth 1:50m data (public domain), projected with a conic equal-area projection so that tile sizes are comparable. Flags are from the flag-icons project (MIT licence). Population figures are mid-2024 estimates from the UN World Population Prospects or national statistics offices; GDP figures are rounded 2024 IMF estimates and are omitted where war has made them unreliable. Articles reflect events up to 2025. Current office-holders are deliberately not listed because they change.</p>
      <p>Boundaries follow what is administered on the ground and do not imply endorsement of any claim.</p>
    </section>
  </article>`;
}
