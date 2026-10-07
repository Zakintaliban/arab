// Number and text formatting shared by the views, chart and map tooltip.

const int = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat('en-GB', { notation: 'compact', maximumSignificantDigits: 3 });

export function people(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(n >= 1e7 ? 1 : 2).replace(/\.?0+$/, '')} million`;
  return int.format(Math.round(n / 1000) * 1000);
}

export const km2 = (n) => `${int.format(n)} km²`;

export function usdBillions(bn) {
  if (bn == null) return 'not available';
  if (bn >= 1000) return `$${(bn / 1000).toFixed(2).replace(/0$/, '')} trillion`;
  return `$${int.format(bn)} billion`;
}

export const usd = (n) => (n == null ? 'not available' : `$${int.format(Math.round(n / 100) * 100)}`);

export const density = (n) => `${n < 10 ? n.toFixed(1) : int.format(n)} per km²`;

// Long form for prose and the infobox.
export function metricLong(metric, v) {
  if (v == null) return 'not available';
  switch (metric) {
    case 'population': return people(v);
    case 'area': return km2(v);
    case 'gdp': return usdBillions(v);
    case 'gdpPerCapita': return usd(v);
    case 'density': return density(v);
    default: return '';
  }
}

// Short form for chart labels and tooltips.
export function metricShort(metric, v) {
  if (v == null) return 'n/a';
  switch (metric) {
    case 'population': return v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : `${int.format(Math.round(v / 1e3))}K`;
    case 'area': return `${compact.format(v)} km²`;
    case 'gdp': return v >= 1000 ? `$${(v / 1000).toFixed(2)}T` : `$${int.format(v)}B`;
    case 'gdpPerCapita': return `$${compact.format(v)}`;
    case 'density': return `${int.format(v)}/km²`;
    default: return '';
  }
}

export function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Escape, then turn straight quotes into typographic ones.
export function prose(s) {
  return esc(s)
    .replace(/(^|[\s(“])&#39;/g, '$1‘')
    .replace(/&#39;/g, '’');
}

export function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
