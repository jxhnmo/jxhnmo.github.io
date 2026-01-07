const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

const assetsDir = path.join('e:', 'School', 'jxhnmo.github.io', 'src', 'assets', 'projects');

const files = [
  'djbestie.jpg',
  'djbestieteam.jpg',
  'fn1.jpg',
  'interviewpro.png',
  'interviewprodata.png',
  'facial.png',
  'personalsite1.png',
  'personalsite2.png',
  'personalsite.png',
  'aadata.png',
  'sandia.png',
  'losalamos1.png',
  'losalamos2.png',
  'nsa1.png',
  'nsa2.png',
  'nsa3.png',
  'usnavy.png'
];

files.forEach(file => {
  try {
    const fullPath = path.join(assetsDir, file);
    if (fs.existsSync(fullPath)) {
      const dimensions = sizeOf(fullPath);
      console.log(`"${file}": { width: ${dimensions.width}, height: ${dimensions.height} },`);
    } else {
        console.log(`"${file}": NOT FOUND`);
    }
  } catch (err) {
    console.error(`Error reading ${file}: ${err.message}`);
  }
});
