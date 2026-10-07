import { copyFileSync, writeFileSync } from 'node:fs';

// GitHub Pages sert ce fichier pour les liens directs vers les fiches.
const output = new URL('../dist/pleine-page/browser/', import.meta.url);
copyFileSync(new URL('index.html', output), new URL('404.html', output));
writeFileSync(new URL('.nojekyll', output), '');
