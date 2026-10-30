import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import './chrome.css';
import ChromeHero, { OrbitLines } from './ChromeHero';
import ProfileSection from './ProfileSection';

import JourneySection from './JourneySection';
import './refinements.css';
import './editorial.css';
import ExpertiseCards from './ExpertiseCards';
import DesignMark from './DesignMark';
import './blueprint.css';
import './profile-layout.css';
import PortfolioCursor from './PortfolioCursor';
import usePageEntrance from './usePageEntrance';
import './page-entrance.css';
import FleetCaseStudy, { FleetCover } from './FleetCaseStudy';
import MobileCaseStudy, { MobileCover } from './MobileCaseStudy';
import ChargingCaseStudy, { ChargingCover } from './ChargingCaseStudy';
import ServiceCaseStudy, { ServiceCover } from './ServiceCaseStudy';
import ShopCaseStudy, { ShopCover } from './ShopCaseStudy';
import AgriCaseStudy, { AgriCover } from './AgriCaseStudy';
import IPCaseStudy, { IPCover } from './IPCaseStudy';
import ModelCaseStudy, { ModelCover } from './ModelCaseStudy';
import RestaurantCaseStudy, { RestaurantCover } from './RestaurantCaseStudy';
import './journey-specular.css';
import './portfolio-polish.css';

const Arrow = ({ diagonal = true, ...props }) => <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.4" /></svg>;
const Star = (props) => <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" {...props}><path d="M20 0c1.8 15.3 4.7 18.2 20 20-15.3 1.8-18.2 4.7-20 20C18.2 24.7 15.3 21.8 0 20 15.3 18.2 18.2 15.3 20 0Z" fill="currentColor"/></svg>;
const projects = [
  { id: '03', title: '为下一程，充满能量。', name: '帮益把 · 充电服务区小程序', category: 'UI / UX', type: '新能源服务设计', year: 'MINI PROGRAM', image: '/images/charging-case/home.png', color: '#d7eee3', tags: ['站点查询', '扫码充电', '充电状态', '订单服务'], isDemo: false },
  { id: '02', title: '每一程，尽在掌握。', name: '帮益把车辆监控平台', category: 'UI / UX', type: '移动端产品设计', year: 'APP UI / UX', image: '/images/mobile-case/map.png', color: '#c7d9f0', tags: ['地图监控', '实时视频', '轨迹回放', '运营报表'], isDemo: false },
  { id: '01', title: '看见每一程，掌握每一刻。', name: '车辆智能监控平台', category: 'UI / UX', type: 'ToB 产品设计', year: 'PC UI / UX', image: '/images/fleet-case/map.webp', color: '#205bc4', tags: ['实时定位', '视频监控', '轨迹回放', '统计报表'], isDemo: false },
  { id: '06', title: '让运营，自有秩序。', name: '智慧服务区 · 后台管理系统', category: 'UI / UX', type: '后台管理系统设计', year: 'PC / DESIGN SYSTEM', image: '/images/service-case/overview.png', color: '#e8ecf7', tags: ['设计规范', '组件体系', '数据表格', '电价配置'], isDemo: false },
  { id: '07', title: '穿出你的态度。', name: '森酷玩 · 户外潮流商城 APP', category: 'UI / UX', type: '商城 APP UI 设计', year: 'APP / E-COMMERCE', image: '/images/shop-case/home.png', color: '#9063f5', tags: ['户外潮流', '商品体验', '交易流程', '活动运营'], isDemo: false },
  { id: '04', title: '科技有温度，生长有秩序。', name: '客外智农 · 数字农业', category: 'UI / UX', type: '智慧农业小程序 UI', isDemo: false, year: 'MINI PROGRAM', date: '2023.11 — 2024.10', image: '/images/project-agri.svg', color: '#c6cba7', tags: ['农场总览', '设备分类', '告警管理', '图标规范'], intro: '从界面体验到设备流程图，再到贴标与画册，让数字农业的信息表达更直观，保持产品与品牌视觉的一致。', role: '部分界面 UI · 图标优化 · C4D 建模 · 画册与贴标', points: ['参与界面设计与优化，统一图标风格。', '运用 C4D 制作官网设备流程图，帮助传递复杂信息。', '设计贴标和画册，支持线下推广与品牌表达。'] },
  { id: '08', title: '让快乐，有一个具体的形状。', name: '直播蜂 · IP 形象与福利中心', category: '视觉设计', type: 'IP 角色设计 / APP 应用', year: 'IP / CHARACTER', image: '/images/ip-case/hero3d-short-arm.webp', color: '#ffd74b', tags: ['IP 设计', '草图研究', '3D 三视图', 'APP 应用'], isDemo: false },
  { id: '09', title: '让表达，多一个维度。', name: 'C4D · 设备与角色建模', category: '视觉设计', type: 'C4D 三维建模', year: '3D / MODELING', image: '/images/model-case/equipment.png', color: '#18323e', tags: ['设备建模', '农业场景', '角色造型', '材质表达'], isDemo: false },
  { id: '10', title: '一席乡味，一份新意。', name: '徽态奶奶 · 餐饮品牌 VI', category: '平面 / 品牌', type: '餐饮品牌视觉设计', year: 'BRAND / VI', image: '/images/restaurant-case/jade-hero.webp', color: '#123e32', tags: ['品牌延展', '包装设计', '餐桌用品', '员工服装'], isDemo: false },
];

const experiences = [
  ['2025.08 — 至今', '安徽帮益把科技有限公司', 'UI 工程师', '物流与新能源 / 多端 UI / 需求与原型 / 品牌视觉'],
  ['2025.04 — 2025.08', '安徽峰极未来科技有限公司', 'UI 设计师', '爱拍蜂、红人蜂等产品的体验迭代'],
  ['2023.04 — 2025.04', '合肥客外网络信息技术有限公司', 'UI 设计师', 'App 与小程序 / 组件库 / C4D / 平面设计'],
  ['2020.10 — 2023.04', '安徽云玺科技有限公司', 'UI 设计师', '智能硬件 / 移动端 / 数据后台 / 运营物料'],
  ['2018.12 — 2020.10', '安徽艺达信息科技有限公司', 'UI 设计师', '在线教育 / 短视频 / 多角色产品体验'],
];
const strengths = [
  ['01', 'UI / UX', '把业务逻辑，变成清晰体验。', '从信息架构、业务流程到交互与高保真界面，兼顾 ToB 的效率与 ToC 的体验。', ['Figma', '交互原型', '设计系统'], 'grid'],
  ['02', 'VISUAL DESIGN', '让每个触点，说同一种语言。', '以美术基础与视觉判断，串联品牌、平面、官网与运营物料，建立一致的视觉识别。', ['Photoshop', 'Illustrator', '品牌 / VI'], 'orbit'],
  ['03', 'AIGC & 3D', '让灵感，多一种实现方式。', '结合 AIGC 辅助创意探索与设计输出，运用 C4D 表达空间和设备流程。', ['AIGC', 'C4D', '创意探索'], 'spark'],
  ['04', 'DESIGN DELIVERY', '从设计出发，走到真实落地。', '理解需求、编写 PRD、参与评审，与研发协作跟进还原，让设计贯穿交付全过程。', ['需求梳理', 'PRD', '研发协作'], 'lines'],
  ['05', 'MULTI-PLATFORM', '让多端体验，保持一致。', '覆盖 PC 管理端、App、小程序与设备端，建立设计规范与组件库，兼顾不同角色和使用场景。', ['多端协同', '组件规范', '一致体验'], 'devices'],
];

function App() {
  const [filter, setFilter] = useState('全部');
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');
  const [paused, setPaused] = useState(false);
  const [floatingNav, setFloatingNav] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  usePageEntrance({ paused, filter, selected });
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true); }, []);
  const dialog = useRef(null);
  const lastFocus = useRef(null);
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hero = document.getElementById('home');
        if (hero) setFloatingNav(hero.getBoundingClientRect().bottom <= 88);
        const readingLine = Math.min(180, window.innerHeight * .25);
        let current = 'home';
        document.querySelectorAll('main > section[id]').forEach(section => {
          if (section.getBoundingClientRect().top <= readingLine) current = section.id;
        });
        setActiveSection(current);
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    if (selected) { lastFocus.current = document.activeElement; dialog.current.showModal(); document.body.style.overflow = 'hidden'; }
    else { dialog.current?.close(); document.body.style.overflow = ''; lastFocus.current?.focus(); }
    return () => { document.body.style.overflow = ''; };
  }, [Boolean(selected)]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 2400); return () => clearTimeout(t); }, [toast]);
  const copy = async (value) => { try { await navigator.clipboard.writeText(value); setToast('已复制：' + value); } catch { setToast('请手动复制：' + value); } };
  const toggleMotion = () => setPaused(value => !value);
  return <>
    {!paused && <PortfolioCursor/>}
    <a className="skip-link" href="#about">跳转到主要内容</a>
    <header className={'header chrome-header ' + (floatingNav ? 'is-floating' : '')}><a className="wordmark" href="#home" aria-label="张子璇 首页">Z<span className="logo-slash">/</span>X<span className="wordmark-dot">.</span><span className="wordmark-sub">ZIXUAN<br/>DESIGN</span></a><nav aria-label="主导航">{[['about', '关于我', '01'], ['expertise', '设计能力', '02'], ['journey', '工作经历', '03'], ['work', '精选作品', '04']].map(([id, label, num]) => <a key={id} href={'#' + id} aria-current={activeSection === id ? 'location' : undefined}>{label} <span>{num}</span></a>)}</nav><a className="nav-contact" href="#contact">聊聊合作 <Arrow /></a></header>
    <main>
      <ChromeHero paused={paused} onToggleMotion={toggleMotion}/>

      <ProfileSection onCopy={copy} paused={paused}/>
      <section id="expertise" className="expertise section"><div className="wrap"><div className="section-label reveal"><span><i/>02 / MY EXPERTISE</span><span>多维能力，一致的设计追求。</span></div><div className="section-title reveal"><DesignMark type="burst" className="expertise-title-mark"/><h2>理性为骨，<span className="title-accent">感性为翼。</span></h2><span className="mono muted">THINK CLEARLY.<br/>CREATE FREELY.</span></div><ExpertiseCards items={strengths}/><div className="design-belief reveal"><span>MY APPROACH</span><p>理解业务 <b>↗</b> 梳理体验 <b>↗</b> 塑造视觉 <b>↗</b> 推动落地</p></div></div></section>

      <JourneySection experiences={experiences} paused={paused}/>

      <section id="work" className="work section wrap"><div className="section-label reveal"><span><i/>04 / SELECTED WORKS</span><span>从真实问题，到设计解答。</span></div><div className="section-title reveal"><DesignMark type="arrow" className="work-title-mark"/><h2>精选<span className="title-accent">作品</span><sup>{String(projects.length).padStart(2, '0')}</sup></h2><p className="muted">不同领域，同样专注。<br/>以系统思考，回应每一个设计命题。</p></div><div className="work-toolbar"><div className="filters" aria-label="项目分类">{['全部', 'UI / UX', '视觉设计', '平面 / 品牌'].map(f => <button key={f} aria-pressed={filter === f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f}{f === '全部' && <span>{String(projects.length).padStart(2, '0')}</span>}</button>)}</div><span className="mono work-tip">CLICK TO EXPLORE ↗</span></div><div className="projects-grid">{projects.filter(p => filter === '全部' || p.category === filter).map(p => <button className="project-card" key={p.id} onClick={() => setSelected(p)} aria-label={'查看' + p.name + '项目详情'}><div className="project-image" style={{background: p.color}}>{p.id === '01' ? <FleetCover/> : p.id === '02' ? <MobileCover/> : p.id === '03' ? <ChargingCover/> : p.id === '06' ? <ServiceCover/> : p.id === '07' ? <ShopCover/> : p.id === '04' ? <AgriCover/> : p.id === '08' ? <IPCover/> : p.id === '09' ? <ModelCover/> : p.id === '10' ? <RestaurantCover/> : <img src={p.image} alt={p.name + (p.isDemo !== false ? '封面示意' : '作品封面')} loading="lazy"/>}<span className="project-number mono">{String(projects.findIndex(project => project.id === p.id) + 1).padStart(2, '0')} / {p.year}</span>{p.isDemo !== false && <span className="demo-label">视觉示意 · 待替换作品原图</span>}<span className="project-open"><Arrow/></span></div><div className="project-info"><div><span className="project-type">{p.type}</span><h3>{p.name}</h3></div><span className="project-year mono">{p.year} <Arrow/></span></div><div className="project-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div></button>)}</div><div className="work-bottom"><span className="orange">✳</span><p>每一个项目，都是一次从理解到创造的旅程。</p><span className="mono">THOUGHTFULLY CRAFTED, ALWAYS.</span></div></section>



      <section id="contact" className="contact"><div className="contact-glow"/><OrbitLines className="contact-orbits"/><div className="wrap contact-inner"><div className="section-label"><span><i/>05 / LET'S CONNECT</span><span>下一次精彩，始于一次交流。</span></div><div className="contact-main"><DesignMark type="globe" className="contact-design-mark"/><div className="eyebrow"><Star/> GOOD IDEAS START WITH A CONVERSATION</div><h2>你的下一个想法，<br/>我们<span className="title-accent">一起实现</span><span className="orange">。</span></h2><a className="contact-email" href="mailto:ayune29@163.com">ayune29@163.com <Arrow/></a><div className="contact-details"><a href="tel:18155260977">电话 <span>181 5526 0977</span><Arrow/></a><button onClick={() => copy('ayune29@163.com')}>邮箱 <span>复制邮箱地址</span><Arrow/></button><span>坐标 <span>合肥，中国</span></span></div></div><footer><a className="footer-name" href="#home">ZIXUAN<span className="orange">.</span></a><span>© {new Date().getFullYear()} 张子璇 · 用心设计，持续探索</span><a href="#home">回到顶部 <span>↑</span></a></footer></div></section>
    </main>
    <dialog ref={dialog} className={"project-dialog" + (["01", "02", "03", "06", "07", "04", "08", "09", "10"].includes(selected?.id) ? " fleet-project-dialog" : "")} onCancel={() => setSelected(null)} onClick={e => {if(e.target === dialog.current) setSelected(null);}} aria-labelledby="dialog-title"><button className="dialog-close" onClick={() => setSelected(null)} aria-label="关闭项目详情">关闭 <span>×</span></button>{selected?.id === "01" ? <FleetCaseStudy onNext={() => {setSelected(projects[3]); dialog.current.scrollTop = 0;}}/> : selected?.id === "02" ? <MobileCaseStudy onNext={() => {setSelected(projects[2]); dialog.current.scrollTop = 0;}}/> : selected?.id === "03" ? <ChargingCaseStudy onNext={() => {setSelected(projects[1]); dialog.current.scrollTop = 0;}}/> : selected?.id === "06" ? <ServiceCaseStudy onNext={() => {setSelected(projects[4]); dialog.current.scrollTop = 0;}}/> : selected?.id === "07" ? <ShopCaseStudy onNext={() => {setSelected(projects[5]); dialog.current.scrollTop = 0;}}/> : selected?.id === "04" ? <AgriCaseStudy onNext={() => {setSelected(projects[6]); dialog.current.scrollTop = 0;}}/> : selected?.id === "08" ? <IPCaseStudy onNext={() => {setSelected(projects[7]); dialog.current.scrollTop = 0;}}/> : selected?.id === "09" ? <ModelCaseStudy onNext={() => {setSelected(projects[8]); dialog.current.scrollTop = 0;}}/> : selected?.id === "10" ? <RestaurantCaseStudy onNext={() => {setSelected(projects[0]); dialog.current.scrollTop = 0;}}/> : selected && <div className="case-study"><div className="case-heading"><span className="mono orange">CASE STUDY {String(projects.findIndex(project => project.id === selected.id) + 1).padStart(2, '0')} / {selected.year}</span><h2 id="dialog-title">{selected.name}</h2><p>{selected.title}</p><div className="case-meta"><div><span>项目时间</span>{selected.date}</div><div><span>我的职责</span>{selected.role}</div></div></div><img className="case-cover" src={selected.image} alt={selected.name + (selected.isDemo !== false ? '视觉示意' : '作品封面')}/><div className="case-body"><span className="mono">01 / PROJECT OVERVIEW</span><h3>项目背景</h3><p>{selected.intro}</p><span className="mono">02 / MY CONTRIBUTION</span><h3>我在其中做了什么</h3>{selected.points.map((point, i) => <div className="contribution" key={point}><span>0{i+1}</span><p>{point}</p></div>)}{selected.detailImage ? <><p className="image-note">{selected.isDemo !== false ? '视觉示意 · 非项目原始设计稿，后续可替换为完整作品长图。' : '完整项目展示'}</p><img className="project-long-image" src={selected.detailImage} alt={selected.name + '项目长图'}/></> : <div className="case-placeholder"><span>DESIGN PREVIEW</span><h3>为真实体验，打磨每一个细节。</h3><p>以上封面为基础版本的视觉示意，不代表项目原始设计稿。<br/>项目背景与职责来自简历；后续将在此接入完整作品长图。</p><img src={selected.image} alt="待替换为原始作品长图的示意布局"/></div>}<button className="next-project" onClick={() => { setSelected(projects[(projects.findIndex(p => p.id === selected.id) + 1) % projects.length]); dialog.current.scrollTop = 0; }}>下一个项目 <Arrow/></button></div></div>}</dialog>
    {toast && <div className="toast" role="status">✓ {toast}</div>}
  </>;
}

createRoot(document.getElementById('root')).render(<App/>);








