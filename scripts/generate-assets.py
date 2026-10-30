from pathlib import Path
import math, pdfplumber

root=Path(__file__).resolve().parent.parent
out=root/'public'/'images'
out.mkdir(parents=True,exist_ok=True)
# Extract the actual profile photo embedded in the supplied resume.
doc=pdfplumber.open(r'F:/下载/张子璇-UI设计师 (3).pdf')
page=doc.pages[0]
if page.images:
    pic=max(page.images,key=lambda p:p['width']*p['height'])
    page.crop((pic['x0'],pic['top'],pic['x1'],pic['bottom'])).to_image(resolution=300).original.convert('RGB').save(out/'portrait.jpg',quality=94)

def save(name,body,w=1000,h=700):
    (out/name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{body}</svg>',encoding='utf-8')

defs='''<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#1c221e"/><stop offset="1" stop-color="#101512"/></linearGradient><radialGradient id="glow"><stop stop-color="#758875" stop-opacity=".25"/><stop offset="1" stop-color="#182019" stop-opacity="0"/></radialGradient><filter id="soft"><feGaussianBlur stdDeviation="60"/></filter></defs>'''
body=defs+'<rect width="1920" height="1080" fill="url(#bg)"/><ellipse cx="1360" cy="540" rx="700" ry="600" fill="url(#glow)"/>'
# A projected, twisted ring sculpture. The fine ribs describe a continuous surface.
paths=[]
for i in range(228):
    u=2*math.pi*i/228
    points=[]
    depths=[]
    for j in range(85):
        v=2*math.pi*j/84
        radius=245+99*math.cos(v)
        x=radius*math.cos(u); y=radius*math.sin(u); z=110*math.sin(v)
        twist=.48*math.sin(u*2)
        yy=y*math.cos(.95)-z*math.sin(.95)
        zz=y*math.sin(.95)+z*math.cos(.95)
        xx=x*math.cos(-.55)-yy*math.sin(-.55)
        yy=x*math.sin(-.55)+yy*math.cos(-.55)
        perspective=1050/(1050-zz)
        points.append((1320+(xx+30*math.cos(v+u*2))*perspective*1.65,520+yy*perspective*1.65))
        depths.append(zz)
    lit=(math.cos(u-2.8)+1)/2
    c=int(65+lit*130)
    color=f'rgb({c},{c+min(10,255-c)},{c})'
    d='M'+' L'.join(f'{x:.1f},{y:.1f}' for x,y in points)+'Z'
    paths.append((sum(depths)/len(depths),f'<path d="{d}" fill="none" stroke="{color}" stroke-width="1.1" opacity=".9"/>'))
body+=''.join(p[1] for p in sorted(paths))
body+='<ellipse cx="1355" cy="935" rx="330" ry="23" fill="#000" opacity=".5" filter="url(#soft)"/>'
save('hero-sculpture.svg',body,1920,1080)

font='font-family="Arial,Microsoft YaHei,sans-serif"'
def text(x,y,s,size=12,fill='#243d35',extra=''):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" {font} {extra}>{s}</text>'
def rect(x,y,w,h,fill,rx=0,extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" {extra}/>'
shadow='<defs><filter id="s" x="-30%" y="-30%" width="170%" height="180%"><feDropShadow dx="0" dy="22" stdDeviation="23" flood-color="#1a332c" flood-opacity=".22"/></filter><linearGradient id="paper" x2="1" y2="1"><stop stop-color="#e2e9e3"/><stop offset="1" stop-color="#b9cfc4"/></linearGradient></defs>'

# Desktop product mockup: deliberately labelled as illustrative in the UI.
b=shadow+rect(0,0,1000,700,'#c1d0c8')
b+=text(64,110,'FLEET INTELLIGENCE',11,extra='letter-spacing="3"')+text(64,151,'运力可视，业务有序。',26)+text(65,180,'A CONNECTED LOGISTICS EXPERIENCE',9,extra='letter-spacing="2"')
b+='<g transform="translate(90 225) rotate(-5 420 210)" filter="url(#s)">'+rect(0,0,830,430,'#f6f8f5',9)+rect(0,0,138,430,'#203a32',9)+rect(120,0,18,430,'#203a32')
b+=text(20,35,'B / 帮益把',18,'#e6eee6')
for i,label in enumerate(['工作台','车辆实时监控','运力管理','充电服务','运营报表','系统设置']):
    if i==1:b+=rect(9,87+i*39,120,30,'#365c4b',4)
    b+=text(24,106+i*39,label,10,'#b0c6b7')
b+=text(160,30,'运力监控工作台',16)+text(674,29,'2026 / 03 / 16',9,'#8b9e92')+rect(154,49,657,1,'#e2e8e1')
for i,(label,val) in enumerate([('车辆总数','1,286'),('运行车辆','968'),('充电服务','128'),('今日运单','2,046')]):
    x=155+i*166;b+=rect(x,66,155,77,'#eaf0e9',4)+text(x+12,86,label,9,'#708a79')+text(x+12,118,val,25)+text(x+111,122,'↗',16,'#5d976d')
b+=rect(155,158,424,253,'#e5ebe4',4)
for i in range(13):
    x=160+i*36;b+=f'<path d="M{x},158 L{x+40},410" stroke="#cbd8ca" fill="none"/>'
for i in range(9):
    y=160+i*30;b+=f'<path d="M155,{y} Q340,{y+30} 579,{y-13}" stroke="#cbd8ca" fill="none"/>'
b+='<path d="M200 382 Q255 280 330 305 T505 192" stroke="#72a287" stroke-width="24" fill="none" opacity=".16"/><path d="M200 382 Q255 280 330 305 T505 192" stroke="#528969" stroke-width="2.5" fill="none"/>'
for x,y in [(210,360),(298,304),(407,284),(497,204)]:b+=f'<circle cx="{x}" cy="{y}" r="6" fill="#fff"/><circle cx="{x}" cy="{y}" r="3" fill="#438562"/>'
b+=text(169,180,'车辆实时位置',10)
b+=rect(594,158,218,119,'#f0f3ed',4)+text(607,180,'运力运行概览',10)
for i,h in enumerate([18,30,24,43,34,53,44,65,56,45,66,60]):b+=rect(610+i*15,255-h,8,h,'#5c8d70',2)
b+=rect(594,289,218,122,'#f0f3ed',4)+text(607,311,'最近车辆动态',10)
for i in range(3):b+=rect(608,326+i*24,190,1,'#d9e1d5')+text(609,343+i*23,['皖 A · 08672','皖 A · 15308','皖 A · 22691'][i],9)+text(747,343+i*23,'运行中',8,'#56896a')
b+='</g>'
save('project-fleet.svg',b)

# Mobile monitoring interface.
b=shadow+rect(0,0,1000,700,'#c0c9da')+text(62,109,'ALWAYS CONNECTED.',11,'#354764',extra='letter-spacing="3"')+text(62,149,'每一程，尽在掌握。',26,'#263954')
def phone(x,y,angle,screen):
    s=f'<g transform="translate({x} {y}) rotate({angle} 112 230)" filter="url(#s)">'+rect(0,0,224,456,'#26313e',30)+rect(6,6,212,444,'#f6f8fc',26)+rect(81,14,63,14,'#26313e',8)
    s+=text(22,47,'9:41',9,'#24334c')+text(169,47,'•••',9,'#24334c')
    s+=screen+rect(83,437,59,4,'#273345',2)+'</g>'
    return s
screen=text(21,87,'车辆监控',20,'#1b304c')+text(21,109,'实时掌握车队运行状态',8,'#8794a8')+rect(14,126,196,205,'#e6ebf0',10)
for i in range(8):screen+=f'<path d="M{20+i*26} 126 l30 205" fill="none" stroke="#ced7e2"/>'
for i in range(8):screen+=f'<path d="M14 {140+i*27} h196" stroke="#ced7e2"/>'
screen+='<path d="M44 292 Q80 206 130 235 T192 156" fill="none" stroke="#477fc4" stroke-width="4"/>'
for x,y in [(55,269),(126,234),(179,189)]:screen+=f'<circle cx="{x}" cy="{y}" r="8" fill="#367ce1" stroke="white" stroke-width="3"/>'
screen+=rect(14,343,196,60,'#fff',8)+text(24,363,'皖 A · 08672',12,'#263b58')+text(24,383,'行驶中 · 当前位置已更新',8,'#8593a7')+text(175,377,'↗',20,'#367ce1')
screen2=text(21,87,'车队概览',20,'#1b304c')+rect(14,108,196,107,'#3e6cb0',12)+text(28,134,'车辆总数',10,'#c4d6ef')+text(28,174,'128',35,'#fff')+text(144,179,'全部车辆 ↗',8,'#fff')
screen2+=text(21,246,'运行数据',13,'#263b58')
for i,(v,l) in enumerate([('86','运行中'),('32','已停车'),('10','待维护')]):screen2+=text(23+i*64,279,v,23,'#294665')+text(23+i*64,299,l,8,'#7e90a7')
screen2+=rect(14,321,196,83,'#e8eef7',8)+text(26,344,'本周运行趋势',10,'#405c80')+'<path d="M25 385 L53 371 L79 380 L106 354 L132 367 L160 350 L193 357" fill="none" stroke="#5781c3" stroke-width="2"/>'
b+=phone(264,207,-13,screen2)+phone(515,160,10,screen)
b+=text(66,636,'VEHICLE MONITORING / APP DESIGN',9,'#526481',extra='letter-spacing="2"')
save('project-mobile.svg',b)

# Agricultural visual direction with vector paper and topographic field patterns.
b=shadow+rect(0,0,1000,700,'#cbd0b3')+text(63,108,'GROW WITH TECHNOLOGY.',11,'#405037',extra='letter-spacing="2.5"')+text(63,148,'让智慧，生长在土地。',26,'#283f2b')
b+='<g transform="translate(120 218) rotate(-7 280 190)" filter="url(#s)">'+rect(0,0,500,350,'#edf0df',3)+text(25,34,'KEWAI / 客外智农',15,'#314c31')+text(337,32,'TECHNOLOGY × NATURE',7,'#677e59')
b+=text(26,105,'每一寸土地',35,'#345332')+text(26,150,'都有生长的力量。',35,'#345332')+text(29,184,'SMART AGRICULTURE, BETTER FUTURE.',8,'#69825a',extra='letter-spacing="1"')
for i in range(28):b+=f'<path d="M{100+i*18} 350 Q{250+i*9} {180+i*2} 500 {110+i*8}" fill="none" stroke="#8caa67" stroke-width="4" opacity=".5"/>'
b+=rect(26,242,100,28,'#315534',2)+text(43,260,'探索智慧农业 ↗',9,'#f0f4e6')+'</g>'
b+='<g transform="translate(641 198) rotate(10 100 200)" filter="url(#s)">'+rect(0,0,208,371,'#254c33',3)+text(21,45,'客外智农',18,'#e1ecd3')+text(21,65,'KEWAI AGRICULTURE',7,'#a9c397',extra='letter-spacing="1"')
for i in range(12):b+=f'<ellipse cx="105" cy="220" rx="{20+i*6}" ry="{35+i*10}" fill="none" stroke="#a9bd78" stroke-width="1" transform="rotate(25 105 220)"/>'
b+=text(22,343,'TECHNOLOGY FOR LIFE.',8,'#ccdcb4')+'</g>'
save('project-agri.svg',b)

# Brand study uses an original placeholder monogram, not a claim about the real logo.
b=shadow+rect(0,0,1000,700,'#d5bcaa')+text(63,108,'A SYSTEM OF CONNECTIONS.',11,'#594232',extra='letter-spacing="2.5"')+text(63,148,'让品牌，清晰可感。',26,'#493527')
b+='<g transform="translate(94 251) rotate(-8 260 150)" filter="url(#s)">'+rect(0,0,487,297,'#eae1d4',3)+text(31,41,'BRAND IDENTITY / CONCEPT',9,'#796a56',extra='letter-spacing="1.5"')
b+='<path d="M122 96 H200 L166 149 H234 L178 220 H101 L146 165 H83Z" fill="#2b4038"/><path d="M222 96 H260 L218 151 H180Z" fill="#ce7956"/>'
b+=text(285,156,'BANG',31,'#2b4038',extra='font-weight="bold"')+text(285,190,'YI BA',31,'#2b4038',extra='font-weight="bold"')+text(31,271,'CONNECTING ENERGY &amp; MOVEMENT.',8,'#796a56',extra='letter-spacing="1"')+'</g>'
b+='<g transform="translate(595 208) rotate(9 135 190)" filter="url(#s)">'+rect(0,0,270,374,'#30473b',3)+text(25,43,'帮益把',23,'#f0e8d9')+text(25,65,'BANG YI BA',8,'#c0c4af',extra='letter-spacing="2"')
for i in range(15):b+=f'<path d="M{25+i*14} 330 L{120+i*14} 148" stroke="#9ba98a" opacity=".65" fill="none"/>'
b+=rect(24,338,45,9,'#c97a57')+rect(75,338,45,9,'#e1d7bf')+rect(126,338,45,9,'#9fa98d')+text(25,361,'ENERGY IN MOTION.',8,'#ccd5c0',extra='letter-spacing="1.5"')+'</g>'
save('project-brand.svg',b)
print('Generated local SVG assets and extracted resume portrait.')
