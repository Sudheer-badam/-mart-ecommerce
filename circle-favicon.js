const { Jimp } = require('jimp');

async function makeCircle() {
  // 1. Read the original logo
  const logo = await Jimp.read('public/logo-new.png');
  
  // 2. Resize/contain the logo within a smaller square (360x360) so it fits inside the 512x512 circle without cropping
  logo.contain({ w: 360, h: 360 });
  
  // 3. Create a 512x512 canvas filled with the logo's pink background color (#fff0f1 -> 0xfff0f1ff)
  const background = new Jimp({ width: 512, height: 512, color: 0xfff0f1ff });
  
  // 4. Composite the contained logo onto the center of the pink canvas
  const x = Math.round((512 - 360) / 2);
  const y = Math.round((512 - 360) / 2);
  background.composite(logo, x, y);
  
  // 5. Apply the circle mask to make it circular
  background.circle();
  
  // 6. Write it to the public directory
  await background.write('public/favicon-circle.png');
  console.log('Created circular favicon successfully!');
}

makeCircle().catch(console.error);
