from pathlib import Path
from PIL import Image

folder = Path('public/images')
with Image.open(folder / 'zixuan-editorial-hero.png') as image:
    image.convert('RGB').save(folder / 'zixuan-editorial-hero.webp', quality=93, method=6)
    print('Hero image:', image.size)
