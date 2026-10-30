import SymbolIcon from './SymbolIcon';
import React, { useState } from 'react';
import ReflectiveCard from './ReflectiveCard';
import CapabilityIcon from './CapabilityIcon';
import './ExpertiseCards.css';

const categoryTitles = ['UI 体验设计', '品牌视觉设计', 'AIGC 与三维', '产品协作交付', '多端协同设计'];

export default function ExpertiseCards({ items }) {
  const [selected, setSelected] = useState(0);
  const select = index => setSelected((index + items.length) % items.length);
  const onKeys = event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      select(selected + (event.key === 'ArrowRight' ? 1 : -1));
    }
  };
  return <div className="expertise-picker" onKeyDown={onKeys} role="region" aria-label="选择设计能力卡片" aria-roledescription="轮播">
    <div className="expertise-picker-bar"><span>EXPLORE MY CAPABILITIES</span><span>点击卡片，探索更多 <i><SymbolIcon type="north-east"/></i></span></div>
    <div className="expertise-deck">
      {items.map(([num, name, title, desc, tags, shape], index) => {
        let offset = (index - selected + items.length) % items.length;
        if (offset > items.length / 2) offset -= items.length;
        const active = selected === index;
        return <article key={num} className={'expertise-slot ' + (active ? 'is-selected' : '')}
          style={{ '--offset': offset, '--distance': Math.abs(offset), zIndex: 5 - Math.abs(offset) }}
          role="button" tabIndex={0} aria-label={'选择 ' + name + ' 能力卡片'} aria-pressed={active}
          onClick={() => select(index)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(index); } }}>
          <ReflectiveCard width="100%" height="100%" radius={28} webcam={false} theme="dark"
            tint={active ? '#a6c4ff' : '#afc1df'} metalness={0.5} roughness={0.65} blurStrength={9}
            shine={0.55} glare={0.18} tiltStrength={4} enableTilt={active} intro={false}>
            <div className="capability-top"><span className="capability-index">{num}<span> / 05</span></span><span className="capability-name">{name}</span></div>
            <div className="capability-art"><span className="capability-aura"/><CapabilityIcon type={shape}/></div>
            <div className="capability-copy"><h3>{categoryTitles[index]}</h3><p className="capability-lead">{title}</p><p className="capability-description">{desc}</p></div>
            <div className="capability-tags">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            <div className="capability-footer"><span className="capability-status"><i/>{active ? '正在探索' : '点击探索'}</span><span className="capability-open"><SymbolIcon type="north-east"/></span></div>
          </ReflectiveCard>
        </article>;
      })}
    </div>
    <div className="expertise-controls">
      <button className="deck-arrow" onClick={() => select(selected - 1)} aria-label="上一张能力卡片"><SymbolIcon type="left"/></button>
      <div className="capability-tabs" aria-label="能力分类">{items.map(([, name], index) => <button key={name} aria-pressed={selected === index} onClick={() => select(index)}>{name}</button>)}</div>
      <button className="deck-arrow" onClick={() => select(selected + 1)} aria-label="下一张能力卡片"><SymbolIcon type="right"/></button>
    </div>
    <p className="deck-counter" aria-live="polite">0{selected + 1}<span> / 0{items.length} — {items[selected][1]}</span></p>
  </div>;
}

