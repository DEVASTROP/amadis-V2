#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * AMADIS - Recadrage + Upload des photos produits
 * Script autonome (CommonJS) - ne dépend pas de l'app Next.js.
 *
 * Usage :
 *   node scripts/resize-and-upload.js --test   (3 premières images, sans upload Supabase)
 *   node scripts/resize-and-upload.js --all    (toutes les images + upload Supabase)
 *
 * Le script :
 *   1. lit chaque image de ./scripts/raw-products/ (jpg, jpeg, png, webp)
 *   2. recadre en 800x1067 (ratio 3/4 portrait, cover centré) avec sharp -> JPEG q85
 *   3. mode --test : sauvegarde dans ./scripts/output-test/ (pas de Supabase)
 *      mode --all : upload vers le bucket Supabase "products" + log l'URL publique
 *   4. gestion d'erreur par image (try/catch, continue sur la suivante)
 *   5. résumé final succès / échecs
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

// --- Configuration -------------------------------------------------------

const SCRIPT_DIR = __dirname;
const RAW_DIR = path.join(SCRIPT_DIR, 'raw-products');
const OUTPUT_TEST_DIR = path.join(SCRIPT_DIR, 'output-test');

const SUPABASE_BUCKET = 'products';
const FINAL_WIDTH = 800;
const FINAL_HEIGHT = 1067; // ratio 3/4 portrait

const SUPPORTED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const TEST_BATCH_SIZE = 3;

// --- Helpers -------------------------------------------------------------

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function listRawImages() {
  ensureDir(RAW_DIR);
  return fs
    .readdirSync(RAW_DIR)
    .filter((f) => SUPPORTED_EXT.has(path.extname(f).toLowerCase()))
    .sort()
    .map((f) => path.join(RAW_DIR, f));
}

async function resizeTo(inputPath, outPath) {
  ensureDir(path.dirname(outPath));
  await sharp(inputPath)
    .resize(FINAL_WIDTH, FINAL_HEIGHT, {
      fit: 'cover',
      position: 'center',
    })
    .jpeg({ quality: 85 })
    .toFile(outPath);
}

// --- Supabase (lazy, mode --all uniquement) ------------------------------

let _supabaseClient = null;
async function getSupabase() {
  if (_supabaseClient) return _supabaseClient;
  const { createClient } = require('@supabase/supabase-js');
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      'Variables Supabase manquantes (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY) dans .env',
    );
  }
  _supabaseClient = createClient(url, key, {
    auth: { persistSession: false },
  });

  // Tentative de création du bucket "products" s'il n'existe pas.
  // Peut échouer silencieusement selon les droits de l'anon key - on continue dans tous les cas.
  try {
    const { error } = await _supabaseClient.storage.getBucket(SUPABASE_BUCKET);
    if (error && (error.message?.includes('not found') || error.statusCode === 404)) {
      await _supabaseClient.storage.createBucket(SUPABASE_BUCKET, {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
        fileSizeLimit: '10MB',
      });
    }
  } catch (e) {
    console.warn(
      `[Supabase] Création/vérif du bucket "${SUPABASE_BUCKET}" sautée: ${e.message}`,
    );
  }

  return _supabaseClient;
}

async function uploadToSupabase(localPath, fileName) {
  const supabase = await getSupabase();
  const fileBuffer = fs.readFileSync(localPath);
  const { error } = await supabase.storage
    .from(SUPABASE_BUCKET)
    .upload(fileName, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });
  if (error) throw new Error(`Upload Supabase: ${error.message}`);

  const { data } = supabase.storage
    .from(SUPABASE_BUCKET)
    .getPublicUrl(fileName);
  return data.publicUrl;
}

// --- Orchestration -------------------------------------------------------

async function processOne(imagePath, mode) {
  const baseName = path.basename(imagePath);
  const stem = path.parse(baseName).name;
  const outFile = path.join(OUTPUT_TEST_DIR, `${stem}.jpg`);

  // Recadrage + redimensionnement (sharp)
  await resizeTo(imagePath, outFile);

  if (mode === 'test') {
    return { outPath: outFile, publicUrl: null };
  }

  // mode all : upload Supabase
  const remoteName = `${stem}.jpg`;
  const publicUrl = await uploadToSupabase(outFile, remoteName);
  return { outPath: outFile, publicUrl };
}

async function main() {
  console.log('=== AMADIS - Resize & Upload photos produits ===');
  const mode = process.argv.includes('--all')
    ? 'all'
    : process.argv.includes('--test')
      ? 'test'
      : null;

  if (!mode) {
    console.error('Argument manquant. Utilisation :');
    console.error('  node scripts/resize-and-upload.js --test');
    console.error('  node scripts/resize-and-upload.js --all');
    process.exit(1);
  }
  console.log(`Mode: ${mode}\n`);

  ensureDir(OUTPUT_TEST_DIR);

  let images = listRawImages();
  if (images.length === 0) {
    console.warn(`Aucune image trouvée dans ${RAW_DIR}`);
    console.warn('Mets-y des .jpg/.png/.webp puis relance le script.');
    return;
  }

  if (mode === 'test') {
    images = images.slice(0, TEST_BATCH_SIZE);
    console.log(`Mode TEST: ${images.length} image(s) sélectionnée(s).\n`);
  } else {
    console.log(`Mode BATCH: ${images.length} image(s) à traiter.\n`);
  }

  const successes = [];
  const failures = [];

  for (let i = 0; i < images.length; i++) {
    const imagePath = images[i];
    const baseName = path.basename(imagePath);
    try {
      console.log(`--- [${i + 1}/${images.length}] ${baseName} ---`);
      const { outPath, publicUrl } = await processOne(imagePath, mode);
      if (publicUrl) {
        console.log(`✅ ${baseName} -> ${outPath}`);
        console.log(`   URL publique: ${publicUrl}\n`);
        successes.push({ file: baseName, outPath, publicUrl });
      } else {
        console.log(`✅ ${baseName} -> ${outPath}\n`);
        successes.push({ file: baseName, outPath });
      }
    } catch (err) {
      console.error(`❌ ${baseName} : ${err.message}\n`);
      failures.push({ file: baseName, reason: err.message });
    }
  }

  // --- Résumé final -----------------------------------------------------
  console.log('═══════════════════════════════════════════════════');
  console.log('RÉSUMÉ');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Succès : ${successes.length}`);
  console.log(`Échecs : ${failures.length}`);
  if (failures.length > 0) {
    console.log('\nFichiers en échec :');
    failures.forEach((f) => console.log(`  - ${f.file} : ${f.reason}`));
  }
  if (successes.length > 0 && mode === 'all') {
    console.log('\nURLs publiques uploadées :');
    successes.forEach((s) => {
      if (s.publicUrl) console.log(`  - ${s.file}: ${s.publicUrl}`);
    });
  }
  console.log('═══════════════════════════════════════════════════');
}

main().catch((err) => {
  console.error('Erreur fatale:', err.message);
  process.exit(2);
});
