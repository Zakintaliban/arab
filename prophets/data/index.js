import { QURAN } from './quran.js';
import { BIBLE } from './bible.js';
import { OTHER } from './other.js';

export { RELIGIONS, RELIGION_BY_ID } from './religions.js';

export const GROUPS = {
  quran: 'The 25 prophets named in the Qur’an',
  bible: 'Prophets of the Hebrew Bible',
  other: 'Beyond the Abrahamic scriptures',
};

// Extra search spellings, including the Indonesian/Malay forms.
const ALIASES = {
  salih: ['saleh', 'shaleh'], ismail: ['ismail', 'ismael'], ishaq: ['ishak'], yaqub: ['yakub', 'yaqub', 'israel'],
  ayyub: ['ayub'], shuayb: ['syuaib', 'syu\'aib', 'shuaib'], dhulkifl: ['dzulkifli', 'zulkifli', 'dhulkifl'],
  dawud: ['daud', 'daut'], sulayman: ['sulaiman'], ilyasa: ['ilyasa', 'alyasa', 'ilyasa\''], zakariyya: ['zakaria', 'zakariya'],
  isa: ['isa al-masih', 'yesus', 'isa almasih'], musa: ['musa'], harun: ['harun'], yahya: ['yahya', 'yohanes pembaptis'],
  nuh: ['nuh'], muhammad: ['muhammad saw', 'mohammed', 'ahmad'], zarathustra: ['zoroaster', 'zarathushtra', 'zartosht', 'zardusht'],
};

const ROLE_NEGATIVE = /^(Not |Rejected)/;

export const FIGURES = [
  ...QURAN.map((f) => ({ ...f, group: 'quran' })),
  ...BIBLE.map((f) => ({ ...f, group: 'bible' })),
  ...OTHER.map((f) => ({ ...f, group: 'other' })),
].map((f) => ({
  ...f,
  short: f.names[0][1],
  title: [...new Set(f.names.map((n) => n[1]))].join(' / '),
  recognisedBy: Object.entries(f.views).filter(([, v]) => !ROLE_NEGATIVE.test(v.role)).map(([k]) => k),
  primary: f.places.find((p) => p.kind === 'born') || f.places[0],
  aliases: ALIASES[f.id] || [],
}));

export const FIGURE_BY_ID = Object.fromEntries(FIGURES.map((f) => [f.id, f]));

// Every map tile code a place sits on, as an array.
export const countriesOf = (place) => (place.country == null ? [] : [].concat(place.country));

// Self-check: related links and route steps must point at real things.
for (const f of FIGURES) {
  for (const r of f.related) console.assert(FIGURE_BY_ID[r], `${f.id}: unknown related figure ${r}`);
  console.assert(f.places.length, `${f.id}: no places`);
}
