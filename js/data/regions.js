// The five sub-regions used to group and colour the map. Colours are tokens
// in css/styles.css (--r-<id>); the 3D map reads the same values.
export const REGIONS = [
  {
    id: 'maghreb',
    name: 'Maghreb',
    gloss: 'al-Maghrib, “the west”',
    blurb: 'The western Arab world: the Atlas Mountains, the Mediterranean and Atlantic coasts, and the western Sahara.',
  },
  {
    id: 'nile',
    name: 'Nile Valley',
    gloss: 'Egypt and Sudan',
    blurb: 'Two countries bound together by the Nile, where pharaonic Egypt and the kingdom of Kush rose.',
  },
  {
    id: 'mashriq',
    name: 'Levant & Mesopotamia',
    gloss: 'the Fertile Crescent',
    blurb: 'The arc of land where farming, cities, writing and the alphabet first took hold.',
  },
  {
    id: 'arabia',
    name: 'Arabian Peninsula',
    gloss: 'Jazirat al-Arab',
    blurb: 'Desert kingdoms and Gulf states, from the incense routes of Yemen to the oil and gas economies of the Gulf.',
  },
  {
    id: 'plateau',
    name: 'Anatolia, Iran & the Caucasus',
    gloss: 'featured in depth',
    blurb: 'Three non-Arab nations on the region’s northern rim. Turkey, Iran and Azerbaijan get extended articles in this atlas.',
  },
];

export const REGION_BY_ID = Object.fromEntries(REGIONS.map((r) => [r.id, r]));
