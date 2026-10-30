import SymbolIcon from './SymbolIcon';
import MagicRings from './MagicRings';
import React, { useEffect, useRef, useState } from 'react';

export function OrbitLines({ className = '' }) {
  return <svg className={'chrome-orbits ' + className} viewBox="0 0 1600 650" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="2.7" strokeDasharray=".1 12" strokeLinecap="round">
      <ellipse cx="370" cy="211" rx="330" ry="93" transform="rotate(17 370 211)"/>
      <ellipse cx="370" cy="211" rx="328" ry="92" transform="rotate(-17 370 211)"/>
      <ellipse cx="1230" cy="211" rx="330" ry="93" transform="rotate(-17 1230 211)"/>
      <ellipse cx="1230" cy="211" rx="328" ry="92" transform="rotate(17 1230 211)"/>
    </g>
    <g stroke="currentColor" strokeWidth=".65" opacity=".18"><path d="M62 460h220m1036 0h220M800 35v40M800 480v65"/><circle cx="800" cy="286" r="242" strokeDasharray="1 19"/></g>
  </svg>;
}

export default function ChromeHero({ paused, onToggleMotion }) {
  const hero = useRef(null);
  const frame = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [personHovered, setPersonHovered] = useState(false);
  const [personFocused, setPersonFocused] = useState(false);
  const personGlowing = personHovered || personFocused;
  useEffect(() => {
    if (paused) { hero.current?.style.setProperty('--mx', '0px'); hero.current?.style.setProperty('--my', '0px'); }
    return () => { cancelAnimationFrame(frame.current); frame.current = null; };
  }, [paused]);
  const move = event => {
    if (paused || event.pointerType !== 'mouse') return;
    const bounds = hero.current.getBoundingClientRect();
    pointer.current = { x: ((event.clientX - bounds.left) / bounds.width - .5) * 36, y: ((event.clientY - bounds.top) / bounds.height - .5) * 20 };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      hero.current?.style.setProperty('--mx', pointer.current.x + 'px');
      hero.current?.style.setProperty('--my', pointer.current.y + 'px');
      frame.current = null;
    });
  };
  const reset = () => { cancelAnimationFrame(frame.current); frame.current = null; hero.current?.style.setProperty('--mx', '0px'); hero.current?.style.setProperty('--my', '0px'); };
  return <section id="home" ref={hero} className={'hero chrome-hero ' + (paused ? 'motion-paused ' : '') + (personGlowing ? 'is-person-glowing' : '')} onPointerMove={move} onPointerLeave={() => { reset(); setPersonHovered(false); }}>
    <svg className="chrome-filter-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs><filter id="chrome-low-key" colorInterpolationFilters="sRGB"><feColorMatrix type="saturate" values="0.65"/><feComponentTransfer><feFuncR type="gamma" amplitude="1" exponent="2" offset="0"/><feFuncG type="gamma" amplitude="1" exponent="2" offset="0"/><feFuncB type="gamma" amplitude="1" exponent="2" offset="0"/></feComponentTransfer></filter></defs></svg>
    <div className="system-ribbon" aria-hidden="true"><span>ZIXUAN DESIGN / PORTFOLIO 2026</span><span>INDEPENDENT MIND // MULTIDISCIPLINARY DESIGN // ALWAYS EVOLVING</span><span>HEFEI, CN / 31.82° N</span></div>
    <div className="chrome-stage" aria-hidden="true"/>
    <div className="hero-magic-rings" aria-hidden="true"><MagicRings color="#c1ff2f" colorTwo="#ffffff" motion="pulse" ringCount={6} speed={0.7} lineThickness={2} glow={1} opacity={0.85} baseRadius={0.3} radiusStep={0.085} hoverScale={1.03} hoverIntensity={0.4} parallax={0.01} clickBurst={false} paused={paused} maxDevicePixelRatio={1.5}/></div>
    <OrbitLines/>
    <div className="chrome-lettering" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <img key={index} src="/images/chrome-portfolio.png" alt="" fetchPriority="high" style={{ maskImage: `url(/images/chrome-letter-mask-${index}.svg)`, WebkitMaskImage: `url(/images/chrome-letter-mask-${index}.svg)`, transform: `translateX(${(index - 4) * 1.05}%)` }}/>)}</div>
    <div className="person-scene">
      <img className="person-glow" src="/images/chrome-person.png" alt="" aria-hidden="true"/>
      <img className="person-base" src="/images/chrome-person.png" alt="佩戴液态金属耳机的人物视觉" fetchPriority="high"/>
      
      <button className="person-hit-target" aria-label="显示人物背后的外发光" aria-pressed={personGlowing} onPointerEnter={event => { if (event.pointerType === 'mouse') setPersonHovered(true); }} onPointerLeave={() => setPersonHovered(false)} onFocus={() => setPersonFocused(true)} onBlur={() => setPersonFocused(false)}/>
    </div>
    <div className="chrome-vignette" aria-hidden="true"/>
    <div className="hero-note hero-note-left hero-identity"><p className="hero-name">张子璇 <span>/ ZIXUAN</span></p><h1 className="hero-roles-heading"><span>UI设计师</span><span>平面设计</span><span>产品助理</span></h1><p className="hero-identity-note">视觉表达 × 产品思考</p></div>
    <aside className="hero-note hero-note-right"><span className="availability-stamp">AVAILABLE FOR<br/>NEW PROJECTS ↗︎</span><span className="note-cross"><SymbolIcon type="spark"/></span><p className="hero-note-title">从想法，到可用的产品。</p><p>以清晰的逻辑构建体验，<br/>用有感知的视觉传递价值。</p><span className="note-index">UI / GRAPHIC / PRODUCT</span></aside>
    <div className="chrome-caption"><span className="caption-kicker">DESIGN WITH PURPOSE / CREATE WITH FEELING</span><h2>让想象有形，<span>让体验发生。</span></h2><a className="chrome-explore" href="#work">探索作品 <span><SymbolIcon type="north-east"/></span></a></div>
    <div className="chrome-bottom"><span>9+ YEARS OF DESIGN EXPLORATION</span><a href="#about" className="chrome-scroll">SCROLL TO EXPLORE <span><SymbolIcon type="down"/></span></a><button onClick={onToggleMotion} className="chrome-motion" aria-label={paused ? '播放背景动画' : '暂停背景动画'} aria-pressed={paused}><span>{paused ? <SymbolIcon type="play"/> : 'Ⅱ'}</span> MOTION {paused ? 'OFF' : 'ON'}</button></div>
  </section>;
}















