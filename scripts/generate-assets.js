const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Create a valid uncompressed PNG buffer using built-in zlib
function createPng(width, height, r, g, b) {
  const signature = Buffer.from([138, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 2; // color type: truecolor RGB
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw image data with scanline filter 0
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(rowSize * height);
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // filter byte
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 3;
      // Slight gradient or border effect
      const isBorder = x < 4 || x >= width - 4 || y < 4 || y >= height - 4;
      if (isBorder) {
        rawData[pixelOffset] = 201;     // Gold R
        rawData[pixelOffset + 1] = 162; // Gold G
        rawData[pixelOffset + 2] = 75;  // Gold B
      } else {
        const factor = 1 - (y / height) * 0.3;
        rawData[pixelOffset] = Math.min(255, Math.floor(r * factor));
        rawData[pixelOffset + 1] = Math.min(255, Math.floor(g * factor));
        rawData[pixelOffset + 2] = Math.min(255, Math.floor(b * factor));
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let j = 0; j < 8; j++) {
      c = (c >>> 1) ^ (c & 1 ? 0xedb88320 : 0);
    }
  }
  return (~c) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crcTarget = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  chunk.writeUInt32BE(crc32(crcTarget), 8 + len);
  return chunk;
}

// Ensure directory
const imagesDir = path.join(__dirname, '../client/public/images');
fs.mkdirSync(imagesDir, { recursive: true });

// Generate logo.png (128x128 navy with gold)
const logoPath = path.join(__dirname, '../client/public/logo.png');
fs.writeFileSync(logoPath, createPng(128, 128, 10, 22, 49)); // Navy #0a1631
console.log('Created logo.png');

// Image names from Step 4
const names = [
  'hero-1.jpg', 'hero-2.jpg', 'hero-3.jpg', 'hero-4.jpg',
  'alula.jpg', 'red-sea.jpg', 'diriyah.jpg', 'asir.jpg',
  'pkg-1.jpg', 'pkg-2.jpg', 'pkg-3.jpg', 'pkg-4.jpg', 'pkg-5.jpg', 'pkg-6.jpg',
  'gallery-1.jpg', 'gallery-2.jpg', 'gallery-3.jpg', 'gallery-4.jpg'
];

// Note: browsers and <img> render PNG buffers even if named .jpg
for (const n of names) {
  const p = path.join(imagesDir, n);
  if (!fs.existsSync(p)) {
    // 400x300 image
    fs.writeFileSync(p, createPng(400, 300, 14, 29, 64));
    console.log(`Created ${n}`);
  }
}
console.log('All image assets created successfully.');
