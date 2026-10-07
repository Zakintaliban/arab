# Design research and decisions

Menapedia is an encyclopedia first and a 3D map second: the map sits on top of every
page, and everything it shows is also available as text. This note records the research
on the four requested styles (3D, claymorphism, glassmorphism and neumorphism), the
reference projects that informed the build, and how each style ended up being used.

## The four styles

### 3D
- **What it is here:** a prism map. Countries are extruded tiles on a bevelled "sea"
  slab. Height can encode population, area, GDP, GDP per person or density.
- **Lessons from references:** GitHub's homepage globe is built from a few layers
  (halo, sphere, regions, data marks), uses no image textures and was tuned hard for
  performance on all devices. Stripe's globe is likewise three layers with strong
  restraint. Both treat the 3D object as the thesis of the page and keep the UI around
  it quiet. globe.gl shows how extruded and hexed country polygons work as data layers.
- **Applied:**
  - Lit from the top left, so shadows fall to the bottom right, matching the light
    direction of the clay and neumorphic UI.
  - No textures except a stripe pattern for the disputed territory.
  - Renders only when something changes; pauses when off-screen.
  - The camera frames the map inside the space the HUD leaves free.
  - A slow idle sway, which can be paused and is off under reduced motion.

### Claymorphism
- **Recipe found:** large radii, an outer drop shadow, a light inner shadow at the top
  left and a dark inner shadow at the bottom right, on bright pastel fills. It reads
  warm and friendly but weakens on dark backgrounds and becomes noisy if used everywhere.
- **Applied:**
  - In 3D, each country is a bevelled "pillow" cap on a wall, with a soft fresnel glow
    in its own colour as the 3D equivalent of the inner highlight.
  - In the UI, clay is used only for things you touch (country cards, chips, the
    infobox and featured cards), never for reading surfaces.
  - Pressing a clay chip turns it neumorphic-inset, so "pressed" has a shape and does
    not rely on colour.

### Glassmorphism
- **Guidance found:** use `backdrop-filter: blur()` around 12–20px with a fairly opaque
  fill, a subtle light border, and a solid fallback; keep text contrast high; respect
  `prefers-reduced-transparency`; limit glass on mobile for performance. Apple's 2025
  Liquid Glass revived the style, and its lesson is the same: glass works where there is
  something rich behind it.
- **Applied:**
  - Glass is used only where content floats over the moving 3D scene: the top bar, the
    map-height dock and the hover tooltip.
  - The fill is 66–70% opaque, with dark ink in light mode and light ink in dark mode.
  - It turns solid under `prefers-reduced-transparency` or when `backdrop-filter` is
    unsupported.

### Neumorphism
- **Problem found:** elements share the page colour and are drawn only by a light and a
  dark shadow, so component boundaries usually fail WCAG 1.4.11 (3:1). The style also
  collapses on images, gradients, pure white and pure black.
- **Applied:** only where the risk is low.
  - Recessed, read-only number wells (with a visible border as well).
  - The track of the map-height switch, whose selected option is a filled, high-contrast
    thumb.
  - The pressed state of chips and tools.

## Reference projects

- [How we built the GitHub globe](https://github.blog/engineering/how-we-built-the-github-globe/):
  layered scene, no textures, performance budget.
- [Stripe: designing and developing an interactive globe](https://stripe.com/blog/globe):
  three-layer composition.
- [globe.gl](https://github.com/vasturiano/globe.gl): hexed, choropleth and extruded
  polygon layers.
- [Flourish 3D globe](https://flourish.studio/blog/interactive-3d-globe/) and Awwwards
  globe and atlas inspiration: guided camera moves and data storytelling.
- Wikipedia redesign concepts (e.g. the
  [Creative Bloq round-up](https://creativebloq.com/creativity/slick-design-concept-brings-wikipedia-bang-date-51411657)):
  - keep the infobox;
  - give articles a clear reading column and a contents rail.

## Style sources

- [Claymorphism in user interfaces](https://uxdesign.cc/claymorphism-in-user-interfaces-1757fabaa377)
- [Implementing claymorphism with CSS (LogRocket)](https://blog.logrocket.com/implementing-claymorphism-css)
- [Claymorphism design guide (Setproduct)](https://www.setproduct.com/blog/claymorphism-design-guide)
- [Glassmorphism meets accessibility (Axess Lab)](https://axesslab.com/?p=5111)
- [Create a glassmorphic UI with CSS (OpenReplay)](https://blog.openreplay.com/create-glassmorphic-ui-css/)
- [How neumorphism works and where it fails (Setproduct)](https://www.setproduct.com/blog/neumorphism-design-guide)
- [Glassmorphism vs neumorphism vs claymorphism (Pixso)](https://pixso.net/articles/glassmorphism-vs-neumorphism-vs-claymorphism/)
- [Glassmorphism, neumorphism, liquid glass: what to use in 2026 (Setproduct)](https://setproduct.com/blog/liquid-glass-vs-glassmorphism)
- [Liquid Glass (Wikipedia)](https://en.wikipedia.org/wiki/Liquid_Glass)

## Palette and type

- **Palette:** taken from the region's glazed tiles. Each sub-region has one glaze:
  - Maghreb: terracotta
  - Nile Valley: saffron
  - Levant & Mesopotamia: Tyrian purple, the dye made in Phoenician Tyre
  - Arabian Peninsula: turquoise
  - Anatolia, Iran & the Caucasus: Persian cobalt, as in İznik and Isfahan tilework
- **Neutrals:** a cool porcelain ground in light mode and lapis in dark mode.
- **Contrast:** body text tokens measure at least 5.4:1 in both themes.
- **Charts:** ranking bars use a single series colour, with the current country
  highlighted. Region hues are never used as a data scale.
- **Type:**
  - Headings: Reem Kufi, a geometric face derived from Kufic calligraphy.
  - Body: Readex Pro, which covers Latin (including Turkish and Azerbaijani letters),
    Arabic and Persian.

## Content and data policy

- **Figures:** rounded, with their year and source.
  - Population: mid-2024 UN WPP or national statistics.
  - GDP: 2024 IMF estimates. Omitted for Sudan, Syria, Yemen, Lebanon and Palestine,
    where war or collapse makes them unreliable.
- **Office-holders:** not listed, because they change.
- **Disputed areas:** boundaries follow Natural Earth's de facto depiction.
  - Western Sahara is split out and shown as a disputed territory, with a neutral note.
  - The Golan Heights note appears on the home page.
