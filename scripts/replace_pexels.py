from pathlib import Path
import re

p = Path('src/lib/data.ts')
text = p.read_text(encoding='utf-8')
print('before', text.count('https://images.pexels.com'))
if "import { IMG } from './images';" not in text:
    text = "import { IMG } from './images';\n" + text
new = re.sub(r"'https://images\.pexels\.com[^']*'", 'IMG.heroBg', text)
p.write_text(new, encoding='utf-8')
print('after', new.count('https://images.pexels.com'))
