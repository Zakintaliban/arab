import { COUNTRIES, TERRITORIES } from './countries.js';
import { FEATURED } from './featured.js';
import { REGIONS, REGION_BY_ID } from './regions.js';

export { REGIONS, REGION_BY_ID };

// Articles in map order: west to east within each region.
const REGION_ORDER = REGIONS.map((r) => r.id);
const WEST_TO_EAST = (a, b) => a.capital.at[1] - b.capital.at[1];

export const ARTICLES = [...COUNTRIES, ...FEATURED]
  .map((c) => ({
    ...c,
    density: c.population / c.area,
    gdpPerCapita: c.gdp == null ? null : (c.gdp * 1e9) / c.population,
  }))
  .sort((a, b) => REGION_ORDER.indexOf(a.region) - REGION_ORDER.indexOf(b.region) || WEST_TO_EAST(a, b));

export const TERRITORY_BY_CODE = Object.fromEntries(TERRITORIES.map((t) => [t.code, t]));
export const BY_CODE = Object.fromEntries(ARTICLES.map((c) => [c.code, c]));

// The data layers the 3D map and the ranking chart can show.
export const METRICS = {
  relief: { label: 'Relief', short: 'Relief', unit: '', describe: 'Every country at the same height' },
  population: { label: 'Population', short: 'Population', unit: 'people', key: 'population', describe: 'Height shows population' },
  area: { label: 'Area', short: 'Area', unit: 'km²', key: 'area', describe: 'Height shows land area' },
  gdp: { label: 'GDP (nominal)', short: 'GDP', unit: 'US$', key: 'gdp', describe: 'Height shows nominal GDP, 2024' },
  gdpPerCapita: { label: 'GDP per person', short: 'GDP/person', unit: 'US$', key: 'gdpPerCapita', describe: 'Height shows GDP per person, 2024' },
  density: { label: 'Population density', short: 'Density', unit: 'people/km²', key: 'density', describe: 'Height shows people per km²' },
};

export function valueOf(country, metric) {
  const m = METRICS[metric];
  return m && m.key ? country[m.key] : null;
}

// 1-based rank of a country among all articles for a metric (null if no data).
export function rankOf(country, metric) {
  const v = valueOf(country, metric);
  if (v == null) return null;
  return ARTICLES.filter((c) => (valueOf(c, metric) ?? -Infinity) > v).length + 1;
}

export const TOTALS = {
  countries: ARTICLES.length,
  population: ARTICLES.reduce((s, c) => s + c.population, 0),
  area: ARTICLES.reduce((s, c) => s + c.area, 0),
};
