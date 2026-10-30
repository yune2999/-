import SymbolIcon from './SymbolIcon';
import React from 'react';
import MagicBento from './MagicBento';
import './personal-bento.css';

const Tag = ({ children }) => <span className="pb-tag">{children}</span>;
function CardHeading({ index, label }) {
  return <div className="pb-card-heading"><span>{index} / {label}</span><i aria-hidden="true"><SymbolIcon type="north-east"/></i></div>;
}

function InterfaceVisual() {
  return <div className="pb-interface" aria-hidden="true"><div className="pb-interface-bar"><i/><i/><i/><span>DESIGN WORKSPACE</span></div><div className="pb-interface-body"><aside><b>ZX.</b><i/><i/><i/><i/></aside><div><div className="pb-ui-heading"><span>Overview</span><i>LIVE</i></div><div className="pb-ui-tiles"><div><span>Experience</span><b>Aa<span><SymbolIcon type="north-east"/></span></b></div><div className="pb-ui-chart">{[35,60,44,78,65,95].map((h,i)=><i key={i} style={{height:h+'%'}}/>)}</div></div><div className="pb-ui-lines"><i/><i/><i/></div></div></div><span className="pb-cursor pb-cursor-a"><SymbolIcon type="north-west"/><b>UI Design</b></span><span className="pb-cursor pb-cursor-b"><SymbolIcon type="north-west"/><b>Product</b></span><div className="pb-phone"><span/><div/><i/><i/><i/></div></div>;
}

function ProductVisual() {
  return <div className="pb-product-flow" aria-hidden="true">{['业务需求','信息架构','交互原型','PRD'].map((s,i)=><React.Fragment key={s}><span><small>0{i+1}</small>{s}</span>{i<3&&<i><SymbolIcon type="right"/></i>}</React.Fragment>)}</div>;
}

function PlatformVisual() {
  return <div className="pb-platform" aria-hidden="true"><div className="pb-device-desktop"><i/><span/><span/></div><div className="pb-device-mobile"><i/><span/></div><div className="pb-device-mini">小<br/>程序</div><span className="pb-device-line"/></div>;
}

function BrandVisual() {
  return <div className="pb-brand-art" aria-hidden="true"><div className="pb-brand-sheet"><span>VISUAL<br/>IDENTITY</span><strong>让品牌<br/><em>被记住。</em></strong><div><i/><i/><i/><i/></div><small>TYPE / COLOR / COMPOSITION</small></div><div className="pb-brand-stamp">Z<span><SymbolIcon type="spark"/></span>X</div><div className="pb-brand-orbit"/></div>;
}

function CreativeVisual() {
  return <div className="pb-creative" aria-hidden="true"><div className="pb-creative-orbit"/><img src="/images/capabilities/glass-ai.png" alt="" loading="lazy"/><span>AIGC × C4D</span></div>;
}

const items = [
  { id:'experience', title:'UI 体验设计', colSpan:2, rowSpan:2, content:<div className="pb-card pb-card-ui"><CardHeading index="01" label="UI / UX DESIGN"/><InterfaceVisual/><div className="pb-card-copy"><h4>让复杂逻辑，<br/>变成<span>清晰体验。</span></h4><p>深耕 ToC 用户体验与 ToB 业务系统，从用户需求出发，梳理信息与操作路径。</p><div className="pb-tags"><Tag>信息架构</Tag><Tag>交互设计</Tag><Tag>高保真界面</Tag></div></div><span className="pb-card-footnote">THINK IN SYSTEMS. DESIGN FOR PEOPLE.</span></div> },
  { id:'product', title:'产品思考与需求梳理', colSpan:2, content:<div className="pb-card pb-card-product"><CardHeading index="02" label="PRODUCT THINKING"/><div className="pb-card-copy"><h4>从「为什么」，走到「怎么做」。</h4><p>独立完成原型与 PRD 编写，参与需求评审，连接业务目标与产品体验。</p></div><ProductVisual/></div> },
  { id:'platform', title:'多端协同设计', content:<div className="pb-card pb-card-platform"><CardHeading index="03" label="CROSS-PLATFORM"/><PlatformVisual/><div className="pb-card-copy"><h4>多端，同一种体验。</h4><p>PC · App · 小程序<br/>设计规范与组件库，保持视觉一致。</p></div></div> },
  { id:'brand', title:'品牌与视觉表达', rowSpan:2, content:<div className="pb-card pb-card-brand"><CardHeading index="04" label="VISUAL IDENTITY"/><BrandVisual/><div className="pb-card-copy"><h4>从界面，<br/>延伸到品牌。</h4><p>美术基础与视觉判断，贯穿 Logo、VI、官网与平面物料。</p><div className="pb-tags"><Tag>Photoshop</Tag><Tag>Illustrator</Tag></div></div></div> },
  { id:'creative', title:'AIGC 与三维探索', content:<div className="pb-card pb-card-creative"><CardHeading index="05" label="CREATIVE EXPLORATION"/><CreativeVisual/><div className="pb-card-copy"><h4>拓展创作的边界。</h4><p>AIGC 辅助设计，结合 C4D 建模，探索更多视觉表达。</p></div></div> },
  { id:'delivery', title:'设计协作与交付', colSpan:2, content:<div className="pb-card pb-card-delivery"><CardHeading index="06" label="DESIGN TO DELIVERY"/><div className="pb-delivery-layout"><div className="pb-card-copy"><h4>把好设计，<span>带到真实场景。</span></h4><p>与研发紧密协作，跟进设计还原与版本迭代，持续复盘、优化交付。</p></div><div className="pb-delivery-art" aria-hidden="true"><i><SymbolIcon type="check"/></i><span>DESIGN<br/><b>READY TO SHIP</b></span><div><em>设计</em><em>研发</em></div></div></div></div> },
];

export default function PersonalBento({ paused }) {
  return <div className="personal-bento-section" role="region" aria-labelledby="personal-bento-title"><div className="wrap"><div className="pb-section-top reveal"><span>ABOUT ME / CAPABILITIES</span><span>DESIGN × PRODUCT × EXPLORATION</span></div><div className="pb-section-title reveal"><h3 id="personal-bento-title">把经验，转化为<span>设计能力。</span></h3><p>从业务理解到视觉表达，再到协作落地。<br/>把多年跨领域的积累，转化为完整的设计能力。</p><span className="pb-section-symbol" aria-hidden="true"><SymbolIcon type="spark"/></span></div><MagicBento items={items} columns={4} rowHeight={252} gap={16} radius={18} theme="light" glowColor="#004fff" enableBorderGlow enableSpotlight spotlightRadius={320} clickEffect textAutoHide={false} enableTilt={false} enableMagnetism={false} disableAnimations={paused} className="personal-bento" style={{'--mb-surface':'linear-gradient(145deg,#ffffff,#f3f7fc)','--mb-ink':'#17334f','--mb-muted':'#60768e','--mb-edge':'#6488b52e','--mb-spot-alpha':'.055'}}/><div className="pb-section-bottom"><span>CURIOUS MIND. CONNECTED SKILLS.</span><span>移动鼠标，探索能力的连接 <i><SymbolIcon type="north-east"/></i></span></div></div></div>;
}
