# Menapedia

A 3D clay-map encyclopedia of the Middle East and North Africa. A three.js map of the
region sits on top of every page; beneath it are encyclopedia articles for 23 countries.
Turkey, Iran and Azerbaijan have extended articles.

## Features

- **3D clay map**
  - Countries are bevelled, extruded tiles with soft shadows.
  - Hover shows a tooltip; click (or select a label) to open an article.
  - Drag to turn the map, scroll or pinch to zoom. Arrow keys and plus/minus work when
    the map has focus.
- **Data layers:** raise countries by population, area, GDP, GDP per person or density,
  with a matching ranking table.
- **Articles:**
  - an infobox, history, geography, economy and culture sections, landmarks with
    "show on map", borders and regional ranks;
  - Turkey, Iran and Azerbaijan also have government, people, cuisine, a timeline,
    city charts and "did you know?".
- **Design:** clay for touchable objects, glass over the 3D scene, neumorphic wells for
  read-only numbers. See [DESIGN.md](DESIGN.md) for the research behind it.
- **Accessibility and theming:**
  - light and dark themes;
  - reduced-motion and reduced-transparency support;
  - every chart is a real table.

## Run it

It is a static site with no build step:

```sh
npx http-server -c-1 .
# or: python3 -m http.server 8080
```

Then open http://localhost:8080. Deep links use the country code, e.g. `#tr`, `#ir`,
`#az`, and `#about` opens the design notes.

## Project layout

| Path | What it is |
| --- | --- |
| `index.html`, `css/styles.css` | Page shell and design tokens (both themes) |
| `js/main.js` | Routing, search, theme, HUD wiring |
| `js/stage.js` | The three.js clay map |
| `js/views.js` | Home, article and design-notes templates; ranking table |
| `js/data/` | Article content: `countries.js`, `featured.js` (Turkey, Iran, Azerbaijan), `regions.js` |
| `js/projection.js` | Conic equal-area projection matching the build step |
| `assets/geo/mena.json` | Pre-projected country outlines (generated) |
| `assets/flags/`, `vendor/three/` | Vendored flags (MIT) and three.js (MIT) |
| `tools/` | Scripts that regenerate the vendored files and map data |

## Regenerating data

```sh
npm install
npm run build      # copies three.js + flags, rebuilds assets/geo/mena.json
```

`tools/build-geo.mjs` reads Natural Earth 1:50m outlines from `world-atlas`, splits
Western Sahara out of Morocco at 27°40′N, simplifies the shapes, projects them with a
conic equal-area projection and finds a label point inside each country.

## Data notes

- **Population:** mid-2024 estimates (UN World Population Prospects 2024 or national
  statistics offices).
- **GDP:** rounded 2024 IMF estimates. Omitted where war has made them unreliable.
- **Coverage:** articles reflect events up to 2025. Current office-holders are
  deliberately not listed.
- **Boundaries:** they follow Natural Earth's depiction of what is administered on the
  ground and do not imply endorsement of any claim.
