import React from 'react';

const glassIcons = {
  grid: 'ui',
  orbit: 'visual',
  spark: 'ai',
  lines: 'delivery',
  devices: 'multi'
};

export default function CapabilityIcon({ type }) {
  return <img
    className="capability-symbol capability-symbol-render"
    src={`/images/capabilities/glass-${glassIcons[type] || 'ui'}.png`}
    alt=""
    aria-hidden="true"
    loading="lazy"
    decoding="async"
    draggable={false}
    width={1280}
    height={1280}
  />;
}
