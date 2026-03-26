const fs = require('fs');

const files = [
  'src/pages/servicios.astro',
  'src/pages/nosotros.astro',
  'src/pages/index.astro',
  'src/pages/blog.astro',
  'src/components/Header.astro'
];

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/\[4\.625rem\]/g, '18.5');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed:', filePath);
});
