"""Encode large case-study PNG assets without resizing or altering artwork."""
from pathlib import Path
from PIL import Image
import json

root = Path(__file__).resolve().parents[1]
cases = {'Charging': 'charging', 'Mobile': 'mobile', 'Fleet': 'fleet', 'Service': 'service', 'Shop': 'shop', 'Agri': 'agri', 'IP': 'ip', 'Model': 'model', 'Restaurant': 'restaurant'}
for component, key in cases.items():
    path = root / 'src' / f'{component}CaseStudy.jsx'
    source = path.read_text(encoding='utf-8')
    if "import ProjectBrief from './ProjectBrief';" not in source:
        source = "import ProjectBrief from './ProjectBrief';\n" + source
        source = source.replace('</header>', f'</header><ProjectBrief project="{key}"/>', 1)
        path.write_text(source, encoding='utf-8')

report = []
for path in (root / 'public/images').rglob('*.png'):
    if not path.parent.name.endswith('-case') or path.stat().st_size < 700_000:
        continue
    output = path.with_suffix('.webp')
    with Image.open(path) as image:
        image.save(output, 'WEBP', quality=90, method=6)
    if output.stat().st_size >= path.stat().st_size:
        continue
    # Case components use folder constants + literal filenames; CSS uses full paths.
    for source_path in (root / 'src').iterdir():
        if source_path.suffix not in {'.jsx', '.css'}:
            continue
        source = source_path.read_text(encoding='utf-8')
        if path.name not in source:
            continue
        # Restrict basename replacement to its own case to avoid collisions such as home.png.
        case_name = path.parent.name.removesuffix('-case')
        own_case = source_path.stem.lower().startswith(case_name) or (case_name == 'fleet' and source_path.stem == 'FleetDesignSystem')
        new_source = source.replace(path.name, output.name) if own_case else source.replace('/images/' + path.parent.name + '/' + path.name, '/images/' + path.parent.name + '/' + output.name)
        if new_source != source:
            source_path.write_text(new_source, encoding='utf-8')
    report.append({'file': str(path.relative_to(root)), 'before': path.stat().st_size, 'after': output.stat().st_size})

(root / 'tmp/polish-assets-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Encoded {len(report)} assets: {sum(x["before"] for x in report)/1e6:.1f} MB -> {sum(x["after"] for x in report)/1e6:.1f} MB. Original PNGs retained.')
