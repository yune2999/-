import React from 'react';
import DesignMark from './DesignMark';
import CircularText from './CircularText';
import MagicBento from './MagicBento';
import './profile-info-effects.css';

function SoftwareIcon({ name }) {
  if (name === 'Figma') return <svg viewBox="0 0 40 40" aria-hidden="true"><rect x="2" y="2" width="36" height="36" rx="9" fill="#1e1e1e"/><g transform="translate(6 4) scale(.7)"><path fill="#f24e1e" d="M13 4h7v12h-7a6 6 0 0 1 0-12Z"/><path fill="#ff7262" d="M20 4h7a6 6 0 0 1 0 12h-7Z"/><path fill="#a259ff" d="M13 16h7v12h-7a6 6 0 0 1 0-12Z"/><circle cx="26" cy="22" r="6" fill="#1abcfe"/><path fill="#0acf83" d="M13 28h7v6a6 6 0 1 1-7-6Z"/></g></svg>;
  if (name === 'Photoshop') return <svg viewBox="0 0 40 40" aria-hidden="true"><rect x="2" y="2" width="36" height="36" rx="9" fill="#071e34" stroke="#245780"/><text x="8" y="27" fill="#5db9ff" fontFamily="Arial,sans-serif" fontSize="21" fontWeight="600">Ps</text></svg>;
  if (name === 'Illustrator') return <svg viewBox="0 0 40 40" aria-hidden="true"><rect x="2" y="2" width="36" height="36" rx="9" fill="#301b0d" stroke="#66411c"/><text x="9" y="27" fill="#ffb453" fontFamily="Arial,sans-serif" fontSize="21" fontWeight="600">Ai</text></svg>;
  return <svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><circle cx="20" cy="20" r="16" fill="#bacbdf"/><path d="M8 22C5 10 21 3 29 9c-10-2-17 10-9 16 5 4 13-1 14-7 3 13-13 21-22 11" fill="#3f5f8d"/><path d="M12 11c-8 8-1 22 11 19" stroke="#eff7ff" strokeWidth="3" strokeLinecap="round"/><circle cx="23" cy="14" r="6" fill="#edf5ff"/></svg>;
}

export default function ProfileSection({ onCopy, paused = false }) {
  const infoCards = [
    { id: 'profile-approach', content: <div className="profile-approach"><span className="profile-approach-label">HOW I DESIGN / 设计理念</span><DesignMark type="arrow" className="profile-approach-mark"/><h3>让复杂变清晰，<br/><em>让体验有温度。</em></h3><p>理解业务 <i/>梳理体验 <i/>塑造视觉</p></div> },
    { id: 'profile-tools', content: <div className="software-stack"><span className="software-label">MY EVERYDAY TOOLKIT</span><div className="software-list">{['Figma', 'Photoshop', 'Illustrator', 'Cinema 4D'].map(name => <div className="software-item" key={name}><SoftwareIcon name={name}/><span>{name}</span></div>)}</div></div> },
  ];
  return <section id="about" className="about section wrap profile-section">
    <div className="section-label reveal"><span><i/>01 / ABOUT ME</span></div>
    <div className="profile-editorial-note"><CircularText text="保持好奇，持续生长 · CURIOUS MIND. BOLD IDEAS.   " spinDuration={30} onHover="slowDown" direction="clockwise" size={180} fontSize={12} fontWeight={650} hoverTilt={8} draggable><DesignMark type="smile"/></CircularText></div><div className="profile-layout reveal">
      <aside className="profile-portrait-column"><div className="portrait profile-photo"><img src="/images/profile-lime-glasses.png" alt="张子璇佩戴黄绿色眼镜的肖像" loading="lazy"/><span className="portrait-index">HEFEI / CN</span></div><p className="profile-photo-caption">DESIGNER, & A CAT PERSON.</p><span className="profile-availability"><i/>开放新的设计机会</span></aside>
      <div className="profile-summary"><span className="eyebrow muted">A LITTLE ABOUT MYSELF</span><h2><strong className="profile-name">张子璇</strong> <span className="profile-signature">Zixuan Zhang</span></h2><p className="profile-position">UI设计师 <i/>平面设计 <i/>产品助理</p><p className="profile-intro">拥有 9 年以上 UI 与平面设计经验，连接产品体验与品牌视觉。既关注复杂业务系统中的效率，也关注日常产品中人与界面的真实感受。</p><p className="profile-intro muted">从信息架构、交互原型到界面与品牌表达，结合 AIGC 与 3D 探索更多创作可能。也曾独立梳理需求、编写 PRD，并与研发协作推进产品落地。</p><div className="profile-contact"><button onClick={() => onCopy('ayune29@163.com')}><span>EMAIL / 点击复制</span><strong>ayune29@163.com ↗︎</strong></button><a href="tel:18155260977"><span>PHONE</span><strong>181 5526 0977 ↗︎</strong></a><div><span>BASED IN</span><strong>中国 · 合肥</strong></div></div></div>
    </div>
    <MagicBento items={infoCards} columns={2} rowHeight={185} gap={24} radius={0} theme="light" glowColor="#004fff" spotlightRadius={300} enableBorderGlow enableSpotlight clickEffect intro={false} disableAnimations={paused} className="profile-bottom profile-info-effects"/>
    <div className="profile-education reveal"><span>EDUCATION</span><p>上海应用技术大学 <span>艺术与设计学院 · 本科</span></p><time>2010 — 2014</time></div>
  </section>;
}








