// Packages index.html as a claude.ai Artifact page: the host supplies the
// <!doctype>, <html>, <head> and <body> wrapper, so only the head assets and
// the body content are kept. Supporting files are published alongside as-is.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1];
const keep = head
  .split('\n')
  .filter((l) => !/<meta (charset|name="viewport")/.test(l))
  .join('\n');
mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/artifact.html'), `${keep.trim()}\n${body.trim()}\n`);
console.log('wrote dist/artifact.html');
