import React, { useState } from 'react';

const colors = [
  ['#0F2777', 'NAVIGATION', '深蓝 / 导航基底'],
  ['#3D76E5', 'PRIMARY BLUE', '主色 / 顶栏起始色'],
  ['#4ECAFF', 'ACCENT', '青色 / 选中强调'],
  ['#EBF0F5', 'WORKSPACE', '浅灰蓝 / 工作区'],
];

export default function FleetDesignSystem() {
  const [tab, setTab] = useState('实时定位');
  const [checked, setChecked] = useState(true);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('试试切换标签或勾选车辆，查看状态变化。');
  return <section className="fleet-case-section fleet-design-system" aria-labelledby="fleet-system-title">
    <div className="fleet-system-intro"><div><span className="fleet-kicker">06 / DESIGN SYSTEM</span><h3 id="fleet-system-title">以系统，<br/>建立<span>秩序。</span></h3></div><p>从原型界面提取颜色、文字与控件，<br/>让每一次操作都有一致的视觉依据。</p><span className="fleet-tech-label">SYSTEM SPEC / V.01<br/>COLOR · TYPE · COMPONENT</span></div>

    <div className="fleet-spec-heading"><span>01 — COLOR DNA</span><p>稳定的深蓝，连接明亮的操作反馈。</p></div>
    <div className="fleet-color-lab">{colors.map(([color,en,cn], i)=><article key={color} style={{'--spec-color':color}}><div className="fleet-color-surface"><span>0{i+1}</span><i aria-hidden="true">+</i><b>{color}</b></div><div className="fleet-color-caption"><strong>{en}</strong><span>{cn}</span></div></article>)}</div>
    <div className="fleet-gradient-spec"><span>NAVIGATION GRADIENT<i/>#0F2777 → #0D44A9</span><span>HEADER GRADIENT<i/>#3D76E5 → #C9E5FF</span></div>

    <div className="fleet-spec-heading"><span>02 — TYPOGRAPHY</span><p>用字号与字重，让信息有先后。</p></div>
    <div className="fleet-font-lab"><div className="fleet-font-feature"><span className="fleet-tech-label">FONT FAMILY</span><strong>Aa<span>字</span></strong><h4>Microsoft YaHei UI</h4><p>微软雅黑 UI</p><div><span>Light <b>300</b></span><span>Regular <b>400</b></span><span>Bold <b>700</b></span></div></div><div className="fleet-type-rows">{[['32','700','2025','关键数据'],['18','400','车辆运行概览','页面标题'],['16','700','车辆在线数量统计','模块标题'],['14','400','沪A·01026 · 行驶中','正文 / 操作'],['12','300','最后更新时间 14:28:26','辅助信息']].map(([size,weight,text,use])=><div key={size}><span>{size}<small>PX / {weight}</small></span><strong style={{fontSize:size+'px',fontWeight:weight}}>{text}</strong><em>{use}</em></div>)}</div></div>

    <div className="fleet-spec-heading"><span>03 — COMPONENT LAB</span><p>将常用操作沉淀为可复用的控件。</p></div>
    <div className="fleet-component-lab"><div className="fleet-control-board"><div className="fleet-control-caption"><span>A / SEARCH & ACTION</span><span>H 36 · R 8 / 6</span></div><form className="fleet-control-search" onSubmit={e=>{e.preventDefault();setNotice(query?'正在展示「'+query+'」的搜索状态。':'已展示全部车辆的搜索状态。');}}><label className="fleet-spec-search"><span className="sr-only">搜索规范示例</span><input aria-label="搜索规范示例" value={query} onChange={e=>setQuery(e.target.value)} placeholder="可查询车牌/终端/车队"/><button type="submit">查询</button></label><button className="fleet-spec-export" type="button" onClick={()=>setNotice('导出控件：36px 高、6px 圆角、浅蓝底与蓝色文字。')}>导出</button></form><div className="fleet-control-ruler"><span>搜索框 / 252 × 36</span><span>导出按钮 / 86 × 36</span></div><div className="fleet-control-caption"><span>B / NAVIGATION STATES</span><span>DEFAULT → SELECTED</span></div><div className="fleet-spec-tabs" aria-label="规范标签示例">{['实时定位','轨迹回放','视频监控'].map(t=><button key={t} aria-pressed={tab===t} onClick={()=>{setTab(t);setNotice('已选中「'+t+'」，通过文字、背景和强调线共同反馈。');}}>{t}</button>)}</div><label className="fleet-spec-check"><input type="checkbox" checked={checked} onChange={e=>{setChecked(e.target.checked);setNotice(e.target.checked?'车辆已选中。':'车辆已取消选择。');}}/><span>车辆监控中心</span><small>12 辆车</small></label><p className="fleet-spec-status" role="status">{notice}</p></div><div className="fleet-control-notes"><span className="fleet-tech-label">COMPONENT ANATOMY</span><h4>小控件，<br/>同一套语言。</h4><dl><div><dt>36<span>px</span></dt><dd>统一操作高度</dd></div><div><dt>6 / 8<span>px</span></dt><dd>按钮与输入框圆角</dd></div><div><dt>14<span>px</span></dt><dd>正文与操作文字</dd></div></dl><p>白底输入、浅蓝辅助操作、蓝色选中态；在密集的信息中保持清晰的操作识别。</p></div></div>
    <p className="fleet-spec-footnote">颜色、字号、字重与控件尺寸依据 Figma 原型整理；控件区域为可交互的规范展示。</p>
  </section>;
}
