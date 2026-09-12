import { readdir, readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
const root = process.cwd();
const app = path.join(root, 'branding-2');
const prefix = process.env.SITE_PREFIX ?? '/novaim';
const base = `${prefix}/branding-2`;
const originals = new Map();
async function rewrite(dir) {
  for (const entry of await readdir(dir, {withFileTypes:true})) {
    const file = path.join(dir,entry.name);
    if(entry.isDirectory()) await rewrite(file);
    else if(/\.(tsx?|css|jsx?)$/.test(file)) {
      const text = await readFile(file,'utf8');
      const updated = text.replace(/(["'`])\/(media\/|mockups\/|layer-mark\.svg|orbital-mark\.png)/g, `$1${base}/$2`);
      if(text !== updated) { originals.set(file,text); await writeFile(file,updated); }
    }
  }
}
try {
  await rewrite(path.join(app,'src'));
  execFileSync('npm',['run','build'],{cwd:app,stdio:'inherit',env:{...process.env,STATIC_EXPORT:'1',NEXT_PUBLIC_BASE_PATH:base}});
  await rm(path.join(root,'site'),{recursive:true,force:true});
  await mkdir(path.join(root,'site'),{recursive:true});
  await cp(path.join(app,'out'),path.join(root,'site','branding-2'),{recursive:true});
  await writeFile(path.join(root,'site','.nojekyll'),'');
} finally {
  for(const [file,text] of originals) await writeFile(file,text);
}
