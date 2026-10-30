"""Use SVG for standalone UI icons and text presentation for inline symbols."""
from pathlib import Path
import re

root = Path(__file__).resolve().parents[1]
icons = {'↗': 'north-east', '↘': 'south-east', '↖': 'north-west', '→': 'right', '←': 'left', '↓': 'down', '↑': 'up', '✳': 'spark', '✓': 'check'}
text_symbols = set('↗↘↖→←↓↑✳✓▶©☆')
changed = []
for path in (root / 'src').glob('*'):
    if path.suffix not in {'.jsx', '.css'} or path.name == 'SymbolIcon.jsx':
        continue
    source = path.read_text(encoding='utf-8')
    updated = source
    if path.suffix == '.jsx':
        for char, kind in icons.items():
            updated = updated.replace('>' + char + '<', '><SymbolIcon type="' + kind + '"/><')
        updated = updated.replace("{paused ? '▶' : 'Ⅱ'}", "{paused ? <SymbolIcon type=\"play\"/> : 'Ⅱ'}")
        if '<SymbolIcon ' in updated and "import SymbolIcon from './SymbolIcon';" not in updated:
            updated = "import SymbolIcon from './SymbolIcon';\n" + updated
    # U+FE0E explicitly requests a monochrome text glyph on mobile platforms.
    updated = ''.join(c + ('\ufe0e' if c in text_symbols and (i+1 == len(updated) or updated[i+1] not in '\ufe0e\ufe0f') else '') for i,c in enumerate(updated))
    if source != updated:
        path.write_text(updated, encoding='utf-8')
        changed.append(path.name)
print('Normalized symbols in ' + str(len(changed)) + ' files.')
