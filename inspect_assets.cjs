const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const assetsContent = fs.readFileSync('src/config/assets.js', 'utf8');
  const regex = /['"](\/(generated|Assets)\/[^'"]+)['"]/g;
  let match;
  const files = [];
  while ((match = regex.exec(assetsContent)) !== null) {
    files.push(match[1]);
  }

  console.log('Total asset paths found:', files.length);
  for (const f of [...new Set(files)]) {
    const fullPath = path.join(__dirname, 'public', f.replace(/^\//, ''));
    if (!fs.existsSync(fullPath)) {
      console.log('MISSING:', fullPath);
      continue;
    }
    const meta = await sharp(fullPath).metadata();
    console.log(f, 'channels:', meta.channels, 'hasAlpha:', meta.hasAlpha, 'format:', meta.format);
  }
}

run().catch(console.error);
