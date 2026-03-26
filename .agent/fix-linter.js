const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src', function(filePath) {
  if (filePath.endsWith('.astro')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Fix Lucide icons 'class' -> 'className'
    const lucideIcons = ['MapPin', 'Phone', 'Mail', 'Facebook', 'Linkedin', 'Instagram', 'CalendarDays', 'ArrowRight', 'BookOpen', 'Scale', 'FileText', 'CheckCircle2', 'Quote', 'Award', 'Shield', 'Menu', 'X', 'ChevronRight', 'ChevronLeft'];
    
    lucideIcons.forEach(icon => {
      // Regex to match `<IconName ... class="...` and replace with `<IconName ... className="...`
      const regex = new RegExp(`(<${icon}\\s+[^>]*?)class=(["'])`, 'g');
      content = content.replace(regex, '$1className=$2');
    });

    // Fix tailwind canonical classes (from warnings)
    content = content.replace(/-mt-\[calc\(0\.125rem\+4\.5rem\)\]/g, '-mt-18');
    content = content.replace(/h-\[calc\(0\.125rem\+4\.5rem\)\]/g, 'h-18');
    content = content.replace(/flex-grow/g, 'grow');
    content = content.replace(/aspect-\[4\/3\]/g, 'aspect-4/3');
    content = content.replace(/bg-gradient-to-t/g, 'bg-linear-to-t');
    content = content.replace(/grayscale-\[30%\]/g, 'grayscale-30');
    content = content.replace(/z-\[60\]/g, 'z-50');
    content = content.replace(/z-\[58\]/g, 'z-50');
    content = content.replace(/z-\[55\]/g, 'z-50');
    content = content.replace(/h-\[28rem\]/g, 'h-112');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed:', filePath);
    }
  }
});
