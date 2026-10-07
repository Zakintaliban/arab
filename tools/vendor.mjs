// Copies the few third-party runtime files the site needs into /vendor and
// /assets so the atlas runs as plain static files (no CDN, no bundler).
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const nm = join(root, 'node_modules');

const copies = [
  ['three/build/three.module.min.js', 'vendor/three/three.module.min.js'],
  ['three/examples/jsm/controls/OrbitControls.js', 'vendor/three/addons/OrbitControls.js'],
  ['three/examples/jsm/renderers/CSS2DRenderer.js', 'vendor/three/addons/CSS2DRenderer.js'],
  ['three/LICENSE', 'vendor/three/LICENSE'],
  ['flag-icons/LICENSE', 'assets/flags/LICENSE'],
];

// ISO 3166-1 alpha-2 codes of every country with an article.
const FLAGS = ['ma', 'dz', 'tn', 'ly', 'eg', 'sd', 'mr', 'lb', 'sy', 'jo', 'il', 'ps',
  'iq', 'sa', 'kw', 'bh', 'qa', 'ae', 'om', 'ye', 'ir', 'tr', 'az'];
for (const c of FLAGS) copies.push([`flag-icons/flags/4x3/${c}.svg`, `assets/flags/${c}.svg`]);

for (const [from, to] of copies) {
  mkdirSync(dirname(join(root, to)), { recursive: true });
  copyFileSync(join(nm, from), join(root, to));
}
console.log(`vendored ${copies.length} files`);
