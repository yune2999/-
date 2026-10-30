import React from 'react';

export default function DesignMark({ type = 'globe', className = '' }) {
  return <svg className={'design-mark ' + className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    {type === 'globe' ? <g stroke="currentColor" strokeWidth="2"><ellipse cx="50" cy="50" rx="45" ry="29"/><ellipse cx="50" cy="50" rx="24" ry="29"/><ellipse cx="50" cy="50" rx="8" ry="29"/><path d="M5 50h90M11 35h78M11 65h78"/></g>
    : type === 'burst' ? <path fill="currentColor" d="m50 3 8 29 24-19-12 28 29 9-29 9 12 28-24-19-8 29-8-29-24 19 12-28L1 50l29-9-12-28 24 19Z"/>
    : type === 'arrow' ? <path fill="currentColor" d="M17 17h66v66H62V53L26 89 11 74l36-36H17Z"/>
    : <g stroke="currentColor" strokeWidth="3" strokeLinecap="round"><circle cx="50" cy="50" r="43"/><path d="M27 57q23 28 46 0"/><path d="M34 33v8m32-8v8"/></g>}
  </svg>;
}
