import React from 'react';
import DesignMark from './DesignMark';
import SpecularButton from './SpecularButton';

export default function JourneySection({ experiences, paused = false }) {
  return <section id="journey" className="journey-section section"><div className="wrap">
    <div className="section-label reveal"><span><i/>03 / MY JOURNEY</span><span>在不同领域，积累同样的认真。</span></div>
    <div className="section-title journey-title reveal"><h2>每一步，<span className="title-accent">都算数。</span></h2><div className="journey-mark"><DesignMark type="globe"/><span>ALWAYS<br/>EVOLVING ↗︎</span></div><p>从界面到系统，从视觉到体验。<br/>把每一次积累，带入下一次创作。</p></div>
    <ol className="journey-timeline">{experiences.map(([date, company, role, desc], index) => <li className={'timeline-item ' + (index % 2 ? 'is-right' : 'is-left')} key={company}>
      <span className="timeline-node" aria-hidden="true"/><span className="timeline-segment" aria-hidden="true"/>
      <SpecularButton as="article" className="timeline-card" radius={8} lineColor={index === 0 ? '#004fff' : '#c1ff2f'} baseColor={index === 0 ? '#7594ff' : '#48533c'} intensity={1.7} idleIntensity={0.12} shineSize={14} shineFade={40} thickness={1.4} glow={1.15} followMouse={!paused} proximity={55} tintOpacity={0} style={{'--timeline-light': index === 0 ? '#004fff' : '#c1ff2f'}} tabIndex={0} aria-labelledby={'company-' + index}><div className="timeline-card-top"><time>{date}</time><span>{index === 0 ? 'CURRENT' : '0' + (index + 1)}</span></div><h3 id={'company-' + index}>{company}</h3><span className="timeline-role">{role}</span><p>{desc}</p></SpecularButton>
      <span className="timeline-side-label" aria-hidden="true">{['LOGISTICS & ENERGY', 'PRODUCT ITERATION', 'SMART AGRICULTURE', 'CONNECTED HARDWARE', 'ONLINE EDUCATION'][index]}</span>
    </li>)}</ol>
    <p className="journey-footnote"><span>2018 — NOW</span>持续探索，持续进化。<span>THE JOURNEY CONTINUES ↓︎</span></p>
  </div></section>;
}


