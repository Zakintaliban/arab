// HTML for the Prophets Atlas views. All text comes from prophets/data and is
// escaped through esc()/prose() before it reaches the DOM.
import { FIGURES, FIGURE_BY_ID, GROUPS, RELIGIONS, RELIGION_BY_ID, countriesOf } from './data/index.js';
import { esc, prose } from '../js/format.js';

const KIND = { born: 'Born', life: 'Lived or active', died: 'Died or buried' };
const IN = {
  judaism: 'In Judaism', christianity: 'In Christianity', islam: 'In Islam', zoroastrianism: 'In Zoroastrianism',
  mandaeism: 'Among the Mandaeans', druze: 'Among the Druze', samaritanism: 'Among the Samaritans',
};

const rdots = (ids) => `<span class="rdots" aria-hidden="true">${ids.map((id) => `<span class="rdot" style="--c: var(--rel-${id})"></span>`).join('')}</span><span class="visually-hidden">Recognised in ${ids.map((id) => RELIGION_BY_ID[id].name).join(', ')}</span>`;
const rchip = (id, text = RELIGION_BY_ID[id].name, href = `#religion-${id}`) => `<a class="rchip" href="${href}" style="--c: var(--rel-${id})"><span class="rdot" aria-hidden="true"></span>${esc(text)}</a>`;
const inName = (r) => (r.the ? `the ${r.name}` : r.name);
const altNames = (f) => [...new Set(f.names.map((n) => n[1]))].slice(1).join(' · ');

function figureCard(f) {
  return `<li>
    <a class="fcard2 clay" href="#${f.id}">
      ${f.n ? `<span class="fcard2__n">No. ${f.n} of 25</span>` : ''}
      <span class="fcard2__name">${esc(f.short)}</span>
      ${altNames(f) ? `<span class="fcard2__alt">${esc(altNames(f))}</span>` : ''}
      <span class="fcard2__foot"><span>${esc(f.era)}</span>${rdots(f.recognisedBy)}</span>
    </a>
  </li>`;
}

export function religionChips(active) {
  return RELIGIONS.map((r) => `<button type="button" class="chip clay-chip" data-religion="${r.id}" aria-pressed="${r.id === active}" style="--tone: var(--rel-${r.id})"><span class="swatch" aria-hidden="true"></span>${esc(r.name)}</button>`).join('');
}

export function filterFigures(religion) {
  return religion ? FIGURES.filter((f) => f.recognisedBy.includes(religion)) : FIGURES;
}

// ───────────────────────────── home ─────────────────────────────
export function homeView(religion) {
  const list = filterFigures(religion);
  const groups = Object.entries(GROUPS)
    .map(([g, title]) => [g, title, list.filter((f) => f.group === g)])
    .filter(([, , fs]) => fs.length);
  return `
  <article class="folio">
    <header class="folio__head">
      <p class="eyebrow">An atlas of prophets · ${FIGURES.length} figures · ${RELIGIONS.length} religions</p>
      <h1 id="page-title" tabindex="-1">Prophets of the Middle East</h1>
      <p class="lede">Adam, Ibrahim, Musa, Isa, Muhammad and Zarathustra all came from the lands on the map above. Each entry covers one person: where they came from, what they did, the signs and miracles told about them, and what each religion believes about them, in its own section.</p>
    </header>

    <section class="block" aria-labelledby="h-figures">
      <h2 id="h-figures">${religion ? `Recognised in ${esc(inName(RELIGION_BY_ID[religion]))}` : 'All figures'}</h2>
      <div class="filter-row" role="group" aria-label="Filter by religion">
        <button type="button" class="chip clay-chip" data-religion="" aria-pressed="${!religion}">All</button>
        ${religionChips(religion)}
      </div>
      ${groups.map(([g, title, fs]) => `
        <h3 class="group-title">${esc(title)} <span class="note">(${fs.length})</span></h3>
        <ul class="fig-grid" role="list">${fs.map(figureCard).join('')}</ul>`).join('')}
    </section>

    ${religionsBlock()}

    <section class="block prose-block" aria-labelledby="h-read">
      <h2 id="h-read">How to read this atlas</h2>
      <p>Where traditions agree that two names belong to the same person, as with Ibrahim, Abraham and Avraham, there is one entry, with a section for each religion. Where an identification is only proposed by some scholars, as with Dhu al-Kifl and Ezekiel, the figures keep separate entries that point to each other.</p>
      <p>Many locations are remembered by tradition rather than recorded in scripture, and some are disputed. Every place on the map says which. No images of the prophets are shown; the map, their names and the places linked to them stand in their place.</p>
    </section>
  </article>`;
}

function religionsBlock() {
  return `<section class="block" id="religions" aria-labelledby="h-religions">
    <h2 id="h-religions">Religions</h2>
    <p class="block__intro">The faiths whose views appear in the entries, from the world religions to communities of a few hundred people.</p>
    <ul class="rel-grid" role="list">
      ${RELIGIONS.map((r) => `<li><a class="relcard" href="#religion-${r.id}" style="--c: var(--rel-${r.id})">
        <span class="relcard__name">${esc(r.name)}</span>
        <span class="relcard__meta">${esc(r.adherents)} · ${esc(r.origin)}</span>
        <span class="relcard__meta">${FIGURES.filter((f) => f.recognisedBy.includes(r.id)).length} figures in this atlas</span>
      </a></li>`).join('')}
    </ul>
  </section>`;
}

// ───────────────────────────── figure ─────────────────────────────
function placeList(places) {
  return `<ol class="places" role="list">${places.map((p, i) => `<li class="place" id="place-${i}">
    <span class="key__sym key__sym--${p.kind} place__sym" aria-hidden="true"></span>
    <span><span class="place__name">${esc(p.name)}</span><span class="visually-hidden">, ${KIND[p.kind]}</span>${p.trad ? '<span class="badge badge--trad">tradition</span>' : ''}</span>
    <button type="button" class="linkbtn" data-fly="${p.at.join(',')}">Show on map</button>
    <span class="place__note">${prose(p.note)}</span>
  </li>`).join('')}</ol>`;
}

function infobox(f) {
  const born = f.places.find((p) => p.kind === 'born');
  const died = f.places.find((p) => p.kind === 'died');
  const rows = [
    ...f.names.map(([label, name]) => [`Name in ${esc(label)}`, esc(name)]),
    ['Era', esc(f.era)],
    born ? ['Born', `${esc(born.name)}${born.trad ? ' <span class="ib__note">by tradition</span>' : ''}`] : null,
    died ? ['Died or buried', `${esc(died.name)}${died.trad ? ' <span class="ib__note">by tradition</span>' : ''}`] : null,
    ['Scripture', f.refs.map(esc).join('<br>')],
  ].filter(Boolean);
  return `<aside class="infobox clay" aria-labelledby="ib-title" style="--tone: var(--clay-arabia)">
    <h2 class="infobox__title" id="ib-title">${esc(f.title)}</h2>
    <p class="infobox__native">${f.recognisedBy.map((id) => rchip(id, `${RELIGION_BY_ID[id].name}: ${f.views[id].role}`)).join(' ')}</p>
    <dl class="infobox__rows">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  </aside>`;
}

export function figureView(id) {
  const f = FIGURE_BY_ID[id];
  const views = RELIGIONS.filter((r) => f.views[r.id]);
  const toc = [
    ['sec-life', 'Life'],
    f.miracles.length && ['sec-signs', 'Signs and miracles'],
    ...views.map((r) => [`sec-${r.id}`, IN[r.id]]),
    ['sec-places', 'Places'],
    ['sec-refs', 'In scripture'],
  ].filter(Boolean);
  const idx = FIGURES.indexOf(f);
  const prev = FIGURES[(idx - 1 + FIGURES.length) % FIGURES.length];
  const next = FIGURES[(idx + 1) % FIGURES.length];
  const scriptLabel = { ar: 'Arabic', he: 'Hebrew', el: 'Greek', fa: 'Persian' };
  return `
  <article class="folio folio--country">
    <header class="article-head">
      <p class="eyebrow"><a href="#atlas">Prophets</a> <span aria-hidden="true">/</span> ${esc(GROUPS[f.group])}${f.n ? ` · No. ${f.n}` : ''}</p>
      <h1 id="page-title" tabindex="-1">${f.names.map((n) => esc(n[1])).filter((v, i, a) => a.indexOf(v) === i).join(' <span class="amp">·</span> ')}</h1>
      <div class="scripts">${f.scripts.map(([lang, text]) => `<span class="script"><span class="script__text" lang="${lang}" dir="auto">${esc(text)}</span><span class="script__label">${scriptLabel[lang]}</span></span>`).join('')}</div>
      ${f.identity ? `<p class="identity">${prose(f.identity)}</p>` : ''}
    </header>
    <div class="article-grid">
      <nav class="toc" aria-label="Contents">
        <p class="toc__title">Contents</p>
        <ol>${toc.map(([sid, t]) => `<li><a href="#${sid}" data-scroll="${sid}">${esc(t)}</a></li>`).join('')}</ol>
      </nav>
      <div class="article-body">
        <p class="lead">${prose(f.lead)}</p>
        ${infobox(f)}
        <section class="block prose-block" id="sec-life" aria-labelledby="h-life">
          <h2 id="h-life">Life</h2>
          ${f.life.map((p) => `<p>${prose(p)}</p>`).join('')}
        </section>
        ${f.miracles.length ? `<section class="block prose-block" id="sec-signs" aria-labelledby="h-signs">
          <h2 id="h-signs">Signs and miracles</h2>
          <ul class="miracles">${f.miracles.map((m) => `<li>${prose(m)}</li>`).join('')}</ul>
        </section>` : ''}
        ${views.map((r) => `<section class="block prose-block view" id="sec-${r.id}" aria-labelledby="h-${r.id}" style="--c: var(--rel-${r.id})">
          <h2 id="h-${r.id}">${IN[r.id]}</h2>
          <p class="view__role">${rchip(r.id, f.views[r.id].role)}</p>
          ${f.views[r.id].text.map((p) => `<p>${prose(p)}</p>`).join('')}
        </section>`).join('')}
        <section class="block" id="sec-places" aria-labelledby="h-places">
          <h2 id="h-places">Places</h2>
          ${placeList(f.places)}
        </section>
        <section class="block prose-block" id="sec-refs" aria-labelledby="h-refs">
          <h2 id="h-refs">In scripture</h2>
          <ul class="refs">${f.refs.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
        </section>
        ${f.related.length ? `<section class="block" aria-labelledby="h-related">
          <h2 id="h-related">Related figures</h2>
          <ul class="chips" role="list">${f.related.map((r) => `<li><a class="chip clay-chip" href="#${r}" style="--tone: var(--clay-arabia)">${esc(FIGURE_BY_ID[r].title)}</a></li>`).join('')}</ul>
        </section>` : ''}
        <nav class="pager" aria-label="More figures">
          <a class="pager__link chip clay-chip" href="#${prev.id}" rel="prev"><span aria-hidden="true">←</span> ${esc(prev.short)}</a>
          <a class="pager__link chip clay-chip" href="#${next.id}" rel="next">${esc(next.short)} <span aria-hidden="true">→</span></a>
        </nav>
      </div>
    </div>
  </article>`;
}

// ───────────────────────────── religion ─────────────────────────────
export function religionView(id) {
  const r = RELIGION_BY_ID[id];
  const figs = FIGURES.filter((f) => f.views[id]);
  return `
  <article class="folio folio--country" style="--c: var(--rel-${id})">
    <header class="article-head">
      <p class="eyebrow"><a href="#religions">Religions</a></p>
      <h1 id="page-title" tabindex="-1"><span class="rdot rdot--title" aria-hidden="true" style="--c: var(--rel-${id})"></span> ${esc(r.name)}</h1>
    </header>
    <div class="article-grid article-grid--plain">
      <div class="article-body">
        <p class="lead">${prose(r.lead)}</p>
        <dl class="wells">
          <div class="well"><dt>Followers</dt><dd class="well__text">${esc(r.adherents)}</dd></div>
          <div class="well"><dt>Began in</dt><dd class="well__text">${esc(r.origin)}</dd></div>
          <div class="well"><dt>Scripture</dt><dd class="well__text">${esc(r.scripture)}</dd></div>
        </dl>
        <section class="block prose-block" aria-labelledby="h-proph">
          <h2 id="h-proph">Prophets in ${esc(inName(r))}</h2>
          <p>${prose(r.prophecy)}</p>
        </section>
        <section class="block" aria-labelledby="h-figs">
          <h2 id="h-figs">Figures in this atlas</h2>
          <p class="block__intro">What ${esc(inName(r))} says about each figure, from its section in the entry.</p>
          <ul class="places" role="list">${figs.map((f) => `<li class="place place--fig">
            <span class="rdot" aria-hidden="true" style="--c: var(--rel-${id}); margin-top: 7px"></span>
            <span><a class="place__name" href="#${f.id}">${esc(f.title)}</a></span>
            <span></span>
            <span class="place__note">${esc(f.views[id].role)}</span>
          </li>`).join('')}</ul>
        </section>
        <section class="block" aria-labelledby="h-rplaces">
          <h2 id="h-rplaces">Key places</h2>
          ${placeList(r.places)}
        </section>
      </div>
    </div>
  </article>`;
}

export function religionsView() {
  return `<article class="folio">
    <header class="folio__head">
      <p class="eyebrow"><a href="#atlas">Prophets</a></p>
      <h1 id="page-title" tabindex="-1">Religions</h1>
      <p class="lede">The faiths of the Middle East differ on who counts as a prophet. These are the ones whose views appear in the entries.</p>
    </header>
    ${religionsBlock()}
  </article>`;
}

// ───────────────────────────── country filter ─────────────────────────────
export function countryView(code, countryName) {
  const hits = FIGURES.filter((f) => f.places.some((p) => countriesOf(p).includes(code)));
  return `<article class="folio">
    <header class="folio__head">
      <p class="eyebrow"><a href="#atlas">Prophets</a> <span aria-hidden="true">/</span> By country</p>
      <h1 id="page-title" tabindex="-1">${esc(countryName)}</h1>
      <p class="lede">${hits.length ? `${hits.length} figure${hits.length > 1 ? 's are' : ' is'} linked to places in today’s ${esc(countryName)}, by scripture or by tradition.` : `No figure in this atlas is linked to a place in ${esc(countryName)}.`}</p>
    </header>
    ${hits.length ? `<section class="block" aria-labelledby="h-hits"><h2 id="h-hits" class="visually-hidden">Figures</h2>
      <ul class="fig-grid" role="list">${hits.map(figureCard).join('')}</ul></section>` : ''}
  </article>`;
}

// ───────────────────────────── about ─────────────────────────────
export function aboutView() {
  return `<article class="folio">
    <header class="folio__head">
      <p class="eyebrow">About</p>
      <h1 id="page-title" tabindex="-1">Method and sources</h1>
      <p class="lede">This atlas sets the traditions side by side. It reports what each religion teaches in its own terms, and does not judge between them.</p>
    </header>
    <section class="block prose-block" aria-labelledby="h-who">
      <h2 id="h-who">Who is included</h2>
      <p>All 25 prophets named in the Qur'an; the prophets and prophetesses named in the Hebrew Bible who are not among those 25; and Zarathustra, the prophet of ancient Iran. A figure is included because scripture names them, not because of later collections such as the Hadith or the Talmud, although the views sections mention well-known traditions where they matter, and say so.</p>
      <p>The religions covered are Judaism, Christianity and Islam, together with Zoroastrianism and three smaller communities of the region with their own views of these figures: the Mandaeans, the Druze and the Samaritans.</p>
    </section>
    <section class="block prose-block" aria-labelledby="h-names">
      <h2 id="h-names">Names and style</h2>
      <p>Each entry gives the name used in each tradition, such as Ibrahim, Abraham and Avraham, and its spelling in Arabic, Hebrew or Greek. The text is neutral in tone, without honorifics, as in an encyclopedia. Scripture references use chapter and verse as in standard English Bibles and the standard numbering of the Qur'an.</p>
    </section>
    <section class="block prose-block" aria-labelledby="h-places-m">
      <h2 id="h-places-m">Places</h2>
      <p>Pins sit on the 3D map of Menapedia, the sister atlas of the region's countries. Places named in scripture are marked plainly; places known only from later tradition, such as most tombs, are marked “tradition”. Map outlines follow what is administered on the ground and imply no position on any dispute.</p>
    </section>
    <section class="block prose-block" aria-labelledby="h-check">
      <h2 id="h-check">Checking</h2>
      <p>The entries summarise widely shared teaching and give the main scripture passages, so readers can check them at the source. Within each religion there are different schools and opinions; where the difference is well known, the entry mentions it.</p>
    </section>
  </article>`;
}
