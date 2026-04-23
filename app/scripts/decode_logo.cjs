const fs = require('fs');
const path = require('path');

const b64Path = path.join(__dirname, '..', 'public', 'logo_b64.txt');
const outputPath = path.join(__dirname, '..', 'public', 'logo.png');

try {
  let b64Data = fs.readFileSync(b64Path, 'utf8').trim();
  // Remove data URI prefix if present
  if (b64Data.startsWith('data:image/png;base64,')) {
    b64Data = b64Data.replace(/^data:image\/png;base64,/, '');
  }
  
  const buffer = Buffer.from(b64Data, 'base64');
  fs.writeFileSync(outputPath, buffer);
  console.log('Logo saved successfully to ' + outputPath);
} catch (err) {
  console.error('Error processing logo:', err);
  process.exit(1);
}
