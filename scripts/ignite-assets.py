"""Prepare the original stage artwork and vector project presentation frames."""
from pathlib import Path
from PIL import Image
import base64

folder = Path('public/images')
Image.open(folder / 'ignite-stage.png').convert('RGB').save(folder / 'ignite-stage.webp', quality=92, method=6)

items = [
    ('fleet', 'FLEET INTELLIGENCE', '让复杂运力，一目了然。', '#ed408d'),
    ('mobile', 'ALWAYS CONNECTED', '连接车辆，也连接每个决策。', '#c18fe9'),
    ('agri', 'GROW WITH TECHNOLOGY', '科技有温度，生长有秩序。', '#e7a77c'),
    ('brand', 'BEYOND THE SYMBOL', '从一个符号，到完整表达。', '#ff7194'),
]
for key, title, subtitle, accent in items:
    art = (folder / f'project-{key}.svg').read_text(encoding='utf-8')
    # Only remove the original outer presentation color; interface colors stay intact.
    import re
    art = re.sub(r'<rect x="0" y="0" width="1000" height="700" rx="0" fill="#[0-9a-fA-F]+"\s*/>', '', art, count=1)
    data = 'data:image/svg+xml;base64,' + base64.b64encode(art.encode('utf-8')).decode('ascii')
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="700" viewBox="0 0 1000 700">
    <defs>
      <linearGradient id="bg" x2="1" y2="1"><stop stop-color="#20121e"/><stop offset=".6" stop-color="#160b15"/><stop offset="1" stop-color="#351326"/></linearGradient>
      <radialGradient id="glow"><stop stop-color="{accent}" stop-opacity=".19"/><stop offset="1" stop-color="{accent}" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1000" height="700" fill="url(#bg)"/>
    <ellipse cx="750" cy="470" rx="550" ry="370" fill="url(#glow)"/>
    <g opacity=".25" stroke="{accent}" fill="none"><path d="M715 15 955 350 715 685 475 350Z"/><path d="M745 15 985 350 745 685 505 350Z"/><path d="M775 15 1015 350 775 685 535 350Z"/></g>
    <text x="55" y="117" fill="#f7dce9" font-size="25" font-weight="500" letter-spacing="2" font-family="Segoe UI,Arial,sans-serif">{title}</text>
    <text x="56" y="149" fill="#b8809d" font-size="12" font-family="Segoe UI,Microsoft YaHei,sans-serif">{subtitle}</text>
    <path d="M890 77c1.5 16 4.5 19 21 21-16.5 2-19.5 5-21 21-1.5-16-4.5-19-21-21 16.5-2 19.5-5 21-21Z" fill="{accent}"/>
    <svg x="30" y="185" width="940" height="450" viewBox="0 190 1000 480"><image href="{data}" width="1000" height="700"/></svg>
    <path d="M55 656h730" stroke="#8f3f6350"/>
    <text x="55" y="677" fill="#af668c" font-size="8" letter-spacing="3" font-family="Segoe UI,Arial,sans-serif">ZIXUAN DESIGN / SELECTED PROJECT</text>
    </svg>'''
    (folder / f'project-{key}-ignite.svg').write_text(svg,encoding='utf-8')
print('Prepared WebP stage and four original vector presentation frames.')
