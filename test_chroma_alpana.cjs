const sharp = require('sharp');

async function processAlpana() {
  const { data, info } = await sharp('public/generated/bengali_alpana_white.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const outData = Buffer.alloc(width * height * 4);

  let removedCount = 0;
  let keptCount = 0;

  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * 3;
    const destIdx = i * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];

    // Green screen removal logic:
    // Green screen is high green (e.g. g > 120 and g > r * 1.15 and g > b * 1.15)
    // Or Euclidean distance to bright green (0, 255, 0)
    const distToGreen = Math.sqrt(r * r + (g - 255) * (g - 255) + b * b);
    const isGreenDominant = g > 100 && g > r * 1.15 && g > b * 1.15;
    const isGreenScreen = isGreenDominant || distToGreen < 160;

    if (isGreenScreen) {
      outData[destIdx] = 0;
      outData[destIdx + 1] = 0;
      outData[destIdx + 2] = 0;
      outData[destIdx + 3] = 0; // Transparent
      removedCount++;
    } else {
      // It's part of the white motif.
      // Clean any green fringing/spill from the white edges:
      // In white motif, r, g, b should be balanced or pure white.
      // If there's green tint on edge, set g = max(r, b) or make it pure white/cream.
      const maxRB = Math.max(r, b);
      const cleanG = g > maxRB ? maxRB : g;

      // Make the motif pure crisp white or soft cream
      // Since it's intended to be "bengaliAlpanaWhite", we can boost lightness or keep original brightness
      const brightness = Math.max(r, cleanG, b);
      outData[destIdx] = 255;
      outData[destIdx + 1] = 255;
      outData[destIdx + 2] = 255;
      // Use brightness as alpha or keep full alpha if solid
      outData[destIdx + 3] = brightness > 180 ? 255 : Math.round((brightness / 180) * 255);
      keptCount++;
    }
  }

  console.log(`Processed: Removed ${removedCount} green pixels, Kept ${keptCount} motif pixels`);

  await sharp(outData, {
    raw: {
      width,
      height,
      channels: 4,
    }
  })
  .webp({ quality: 90, lossless: false })
  .toFile('public/generated/bengali_alpana_white.webp');

  console.log('Saved public/generated/bengali_alpana_white.webp successfully!');
}

processAlpana().catch(console.error);
