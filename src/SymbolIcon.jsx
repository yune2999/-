import React from 'react';
import './symbol-icon.css';

// Vector shapes keep controls consistent with iOS/Android emoji fonts.
export default function SymbolIcon({ type = 'north-east' }) {
  const arrows = {
    'north-east': 'M5 19 19 5M5 5h14v14',
    'south-east': 'M5 5 19 19M5 19h14V5',
    'north-west': 'M19 19 5 5M5 19V5h14',
    right: 'M4 12h16m-6-6 6 6-6 6',
    left: 'M20 12H4m6-6-6 6 6 6',
    down: 'M12 4v16m-6-6 6 6 6-6',
    up: 'M12 20V4m-6 6 6-6 6 6',
  };
  return <svg className="symbol-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    {arrows[type] ? <path d={arrows[type]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      : type === 'play' ? <path d="m8 5 11 7-11 7Z" fill="currentColor"/>
      : type === 'check' ? <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      : <path d="m12 1 2 7 7-4-4 7 7 1-7 2 4 7-7-4-2 7-2-7-7 4 4-7-7-2 7-1-4-7 7 4Z" fill="currentColor"/>}
  </svg>;
}
