const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function run() {
  const src = path.resolve(__dirname, '..', 'src', 'assets', 'images', 'hero-illustration.png');
  const outDir = path.resolve(__dirname, '..', 'src', 'assets', 'images', 'optimized');
  if (!fs.existsSync(src)) {
    console.error('Source image not found:', src);
    process.exit(1);
  }
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const sizes = [1600, 1200, 800, 480];
  for (const w of sizes) {
    const webpOut = path.join(outDir, `hero-${w}.webp`);
    const avifOut = path.join(outDir, `hero-${w}.avif`);
    const jpgOut = path.join(outDir, `hero-${w}.jpg`);

    console.log(`Generating ${path.basename(webpOut)} ...`);
    await sharp(src)
      .resize({ width: w })
      .webp({ quality: 78, effort: 6 })
      .toFile(webpOut);

    console.log(`Generating ${path.basename(avifOut)} ...`);
    await sharp(src)
      .resize({ width: w })
      .avif({ quality: 50 })
      .toFile(avifOut);

    console.log(`Generating ${path.basename(jpgOut)} ...`);
    await sharp(src)
      .resize({ width: w })
      .jpeg({ quality: 72 })
      .toFile(jpgOut);
  }

  console.log('Optimized images written to', outDir);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
