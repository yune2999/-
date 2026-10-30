from pathlib import Path
import base64

folder=Path('public/images')
items=[('fleet','车辆智能监控调度平台','#c1d0c8',['#203a32','#5c8d70','#eaf0e9','#f6f8f5']),('mobile','帮益把车辆监控平台','#c0c9da',['#26313e','#3e6cb0','#e8eef7','#f6f8fc']),('agri','客外智农 · 数字农业','#cbd0b3',['#254c33','#8caa67','#cbd0b3','#edf0df']),('brand','帮益把 · 品牌视觉','#d5bcaa',['#30473b','#ce7956','#d5bcaa','#eae1d4'])]
for key,title,bg,palette in items:
    data='data:image/svg+xml;base64,'+base64.b64encode((folder/f'project-{key}.svg').read_bytes()).decode()
    font='font-family="Arial,Microsoft YaHei,sans-serif"'
    svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="2100" viewBox="0 0 1000 2100">
    <rect width="1000" height="2100" fill="#e9ece3"/>
    <image href="{data}" x="0" y="0" width="1000" height="700"/>
    <text x="60" y="774" font-size="11" fill="#6b7862" letter-spacing="3" {font}>VISUAL EXPLORATION / CONCEPT ONLY</text>
    <text x="60" y="834" font-size="32" fill="#283b29" {font}>{title}</text>
    <text x="60" y="876" font-size="13" fill="#6b7862" {font}>基础版视觉示意 · 用于预览版式与交互，待替换为原始设计长图。</text>
    <line x1="60" y1="914" x2="940" y2="914" stroke="#cbd2c4"/>
    <text x="60" y="968" font-size="11" fill="#6b7862" letter-spacing="2" {font}>01 / COLOR &amp; VISUAL RHYTHM</text>
    '''
    for i,color in enumerate(palette):
        svg+=f'<rect x="{60+i*224}" y="1000" width="208" height="150" rx="3" fill="{color}"/><text x="{60+i*224}" y="1180" font-size="12" fill="#6b7862" {font}>{color.upper()}</text>'
    svg+=f'''<text x="60" y="1270" font-size="11" fill="#6b7862" letter-spacing="2" {font}>02 / A CLOSER LOOK</text>
    <svg x="60" y="1310" width="880" height="540" viewBox="170 180 650 400"><image href="{data}" width="1000" height="700"/></svg>
    <line x1="60" y1="1905" x2="940" y2="1905" stroke="#cbd2c4"/>
    <text x="60" y="1970" font-size="29" fill="#283b29" {font}>从理解，到清晰表达。</text>
    <text x="60" y="2020" font-size="11" fill="#6b7862" letter-spacing="2" {font}>ZIXUAN DESIGN / PREVIEW EDITION</text></svg>'''
    (folder/f'project-{key}-long.svg').write_text(svg,encoding='utf-8')
print('Generated 4 clearly labelled long-format visual previews.')
