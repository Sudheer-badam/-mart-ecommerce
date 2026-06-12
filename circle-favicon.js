const { Jimp } = require('jimp');

async function makeCircle() {
  const image = await Jimp.read('public/logo-new.png');
  image.cover({ w: 512, h: 512 }); // Resize and crop to square
  
  // Create a circle mask
  image.circle();
  
  await image.write('public/favicon-circle.png');
  console.log('Created circular favicon successfully!');
}

makeCircle().catch(console.error);
