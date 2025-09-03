#!/usr/bin/env node
/* Build local image library + manifest from Car Imagery CSV (robust)
   Headers: id,make,model,variant,title,image,YearStart,YearEnd,colourHex,colourName,width,height,WhiteBackground

   Usage (local copies):
     node scripts/build-car-manifest.mjs --csv data/carimagery/vehicles.csv --images data/carimagery/images --out public/vehicles

   Usage (CDN manifest only):
     CDN_BASE=https://d123456abcdef.cloudfront.net \
     CDN_PREFIX=vehicles \
     CDN_PATH_STYLE=structured \
     node scripts/build-car-manifest.mjs --csv data/carimagery/vehicles.csv --out public/vehicles
*/

import fs from 'fs-extra';
import path from 'path';
import iconv from 'iconv-lite';
import { parse } from 'csv-parse/sync';

// --- fetch fallback for Node < 18 ---
let _fetch = globalThis.fetch;
if (typeof _fetch !== 'function') {
  try {
    const nf = await import('node-fetch');
    _fetch = nf.default;
  } catch {
    // leave undefined; download path will just be skipped
  }
}

// ---- CLI args ----
const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, cur, i, arr) => {
    if (cur.startsWith('--')) acc.push([cur.replace(/^--/, ''), arr[i + 1]]);
    return acc;
  }, [])
);

const CSV_PATH      = args.csv    || 'data/carimagery/vehicles.csv';
const IMAGES_DIR    = args.images || 'data/carimagery/images';
const OUT_DIR       = args.out    || 'public/vehicles';
const MANIFEST_PATH = path.join(OUT_DIR, 'manifest.json');
const DRY_RUN       = args.dry === 'true' || args.dry === '1' || args.dry === '' || args.dry === true;

const VERBOSE       = process.env.VERBOSE === '1';

// ✅ CDN mode/env
const CDN_BASE_RAW   = (process.env.CDN_BASE || '').trim();          // e.g. https://d123.cloudfront.net
const CDN_BASE       = CDN_BASE_RAW.replace(/\/+$/,'');
const CDN_PREFIX_RAW = (process.env.CDN_PREFIX || '').trim();        // e.g. vehicles
const CDN_PREFIX     = CDN_PREFIX_RAW.replace(/^\/+|\/+$/g,'');      // no leading/trailing slash
const CDN_PATH_STYLE = (process.env.CDN_PATH_STYLE || 'structured').toLowerCase(); // 'structured' | 'basename'

// If CDN_BASE is present, skip local copy unless explicitly forced
const SKIP_COPY = !!CDN_BASE || DRY_RUN;

// ---- helpers ----
function norm(s) {
  return (s || '').toString().trim().toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, ''); // strip odd punctuation
}
function slug(s) {
  return norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function extnameSafe(pth) {
  const ext = (path.extname(pth || '') || '.jpg').toLowerCase();
  return ext === '.jpeg' ? '.jpg' : ext;
}
function pickFilenameFromUrl(url) {
  try { const u = new URL(url); return path.basename(u.pathname) || null; }
  catch { return path.basename(url || '') || null; }
}

async function readCsvText(filePath) {
  const buf = await fs.readFile(filePath);
  if (buf.length >= 3) {
    const b0 = buf[0], b1 = buf[1], b2 = buf[2];
    if (b0 === 0xFF && b1 === 0xFE) return iconv.decode(buf, 'utf16-le'); // UTF-16LE
    if (b0 === 0xFE && b1 === 0xFF) return iconv.decode(buf, 'utf16-be'); // UTF-16BE
    if (b0 === 0xEF && b1 === 0xBB && b2 === 0xBF) return buf.slice(3).toString('utf8'); // UTF-8 BOM
  }
  return buf.toString('utf8');
}

function sanitizeCsv(raw) {
  let s = raw;
  s = s.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  s = s.replace(/\uFEFF/g, '').replace(/\u0000/g, '');
  s = s.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
  s = s.replace(/[^\x09\x0A\x20-\x7E\u00A0-\uFFFF]/g, '');
  const lines = s.split('\n'); if (!lines.length) return s;
  const header = lines[0], kept = [header];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]; if (!line.trim()) continue;
    const dq = (line.match(/"/g) || []).length;
    if (dq % 2 === 0) kept.push(line);
    else if (VERBOSE) console.warn(`Skipping malformed CSV line ${i + 1}`);
  }
  return kept.join('\n');
}

async function ensureCopiedOrDownloaded(srcLocalAbs, remoteUrl, outAbs) {
  if (DRY_RUN) return true; // pretend success
  await fs.ensureDir(path.dirname(outAbs));

  // prefer local
  if (srcLocalAbs) {
    try {
      const st = await fs.stat(srcLocalAbs);
      if (st.isFile()) { await fs.copyFile(srcLocalAbs, outAbs); return true; }
    } catch {}
  }

  // fallback: download
  if (remoteUrl && typeof _fetch === 'function') {
    try {
      const res = await _fetch(remoteUrl);
      if (!res.ok) throw new Error(String(res.status));
      const buf = Buffer.from(await res.arrayBuffer());
      await fs.writeFile(outAbs, buf);
      return true;
    } catch (e) {
      if (VERBOSE) console.warn('Download failed:', remoteUrl, e?.message || e);
    }
  }

  return false;
}

function cdnJoin(...parts) {
  const cleaned = parts
    .filter(Boolean)
    .map(p => String(p).replace(/^\/+|\/+$/g,''))
    .filter(p => p.length > 0);
  return cleaned.length ? `${CDN_BASE}/${cleaned.join('/')}` : CDN_BASE;
}

async function main() {
  await fs.ensureDir(OUT_DIR);
  const manifest = {};
  let rows = 0, written = 0, skippedNoModel = 0, failures = 0;

  if (CDN_BASE) {
    console.log('CDN mode enabled');
    console.log('  CDN_BASE     :', CDN_BASE);
    console.log('  CDN_PREFIX   :', CDN_PREFIX || '(none)');
    console.log('  PATH_STYLE   :', CDN_PATH_STYLE);
  }
  if (DRY_RUN) console.log('DRY RUN: no files will be copied or downloaded.');

  const csvRaw  = await readCsvText(CSV_PATH);
  const csvText = sanitizeCsv(csvRaw);
  const records = parse(csvText, {
    columns: true,
    trim: true,
    skip_empty_lines: true,
    bom: true,
    relax_quotes: true,
    relax_column_count: true,
    skip_records_with_error: true,
  });

  console.log('Records loaded (after cleaning):', records.length);

  for (const row of records) {
    rows++;
    const Make = row.make, Model = row.model, Variant = row.variant, ImageURL = row.image;
    const YearStart = Number(row.YearStart), YearEnd = Number(row.YearEnd);

    if (!Model) { skippedNoModel++; continue; }

    const baseName = pickFilenameFromUrl(ImageURL);
    if (!baseName) { failures++; continue; }

    const start = Number.isFinite(YearStart) ? YearStart : undefined;
    const end   = Number.isFinite(YearEnd)   ? YearEnd   : start;
    if (!start) continue;

    const ext = extnameSafe(baseName);

    for (let y = start; y <= (end || start); y++) {
      const outDirLocal = path.join(OUT_DIR, slug(Make), slug(Model));
      const outAbsLocal = path.join(outDirLocal, `${y}${ext}`);
      const outRelLocal = `/${path.posix.join('vehicles', slug(Make), slug(Model), `${y}${ext}`)}`;

      // Build CDN URL if configured
      const cdnUrl =
        CDN_BASE
          ? (CDN_PATH_STYLE === 'basename'
              ? cdnJoin(CDN_PREFIX, baseName)
              : cdnJoin(CDN_PREFIX, slug(Make), slug(Model), `${y}${ext}`))
          : null;

      // local copy (unless skipped)
      if (!SKIP_COPY) {
        const srcLocal = path.join(IMAGES_DIR, baseName);
        const ok = await ensureCopiedOrDownloaded(srcLocal, ImageURL, outAbsLocal);
        if (!ok) { failures++; continue; }
        written++;
      }

      const mk = norm(Make), md = norm(Model), yr = norm(String(y)), vt = norm(Variant);
      const finalUrl = cdnUrl || outRelLocal;

      // prefer variant-specific when available
      if (vt) manifest[`${mk}|${md}|${yr}|${vt}`] = finalUrl;
      manifest[`${mk}|${md}|${yr}`] = finalUrl;
    }
  }

  await fs.writeJson(MANIFEST_PATH, manifest, { spaces: 2 });

  const keys = Object.keys(manifest);
  console.log('— Build complete —');
  console.log('Rows processed     :', rows);
  console.log('Images written     :', written, SKIP_COPY ? '(skipped: CDN/DRY mode)' : '');
  console.log('Skipped (no model) :', skippedNoModel);
  console.log('Failures (no file) :', failures);
  console.log('Manifest           :', MANIFEST_PATH);
  if (keys.length) {
    console.log('Sample manifest key:', keys[0], '→', manifest[keys[0]]);
  } else {
    console.log('Manifest is empty (no images were written).');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
