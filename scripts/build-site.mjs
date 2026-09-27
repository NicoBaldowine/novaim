import { readdir, readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const apps = [
  { directory: 'branding-1', source: 'src' },
  { directory: 'branding-2', source: 'src' },
  { directory: 'landing-1', source: 'src' },
  { directory: 'broki', source: 'app' },
];
const prefix = process.env.SITE_PREFIX ?? '/novaim';

async function rewrite(dir, base, originals) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await rewrite(file, base, originals);
    else if (/\.(tsx?|css|jsx?)$/.test(file)) {
      const text = await readFile(file, 'utf8');
      const updated = text.replace(/(["'`])\/(media\/|mockups\/|layer-mark\.svg|orbital-mark\.png)/g, `$1${base}/$2`);
      if (text !== updated) {
        originals.set(file, text);
        await writeFile(file, updated);
      }
    }
  }
}

await rm(path.join(root, 'site'), { recursive: true, force: true });
await mkdir(path.join(root, 'site'), { recursive: true });

for (const config of apps) {
  const app = path.join(root, config.directory);
  const route = process.env.COMPACT_ROUTES === '1' ? config.directory.replace('-', '') : config.directory;
  const base = `${prefix}/${route}`;
  const originals = new Map();
  try {
    await rewrite(path.join(app, config.source), base, originals);
    execFileSync('npm', ['run', 'build'], { cwd: app, stdio: 'inherit', env: { ...process.env, STATIC_EXPORT: '1', NEXT_PUBLIC_BASE_PATH: base } });
    await cp(path.join(app, 'out'), path.join(root, 'site', route), { recursive: true });
  } finally {
    for (const [file, text] of originals) await writeFile(file, text);
  }
}

await writeFile(path.join(root, 'site', '.nojekyll'), '');
