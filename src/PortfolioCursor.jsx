import React, { lazy, Suspense, useEffect, useState } from 'react';

const BlobCursor = lazy(() => import('./BlobCursor'));

export default function PortfolioCursor() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(pointer.matches && !reduced.matches && !document.hidden);
    update();
    pointer.addEventListener('change', update);
    reduced.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    return () => {
      pointer.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);

  if (!enabled) return null;
  return <Suspense fallback={null}><BlobCursor
    className="portfolio-blob-cursor"
    material="chrome"
    color="#ffffff"
    size={17}
    morphSpeed={0.15}
    trail={2}
    lag={0.18}
    goo={0.25}
    wobble={0.12}
    shine={0.55}
    hideCursor={false}
  /></Suspense>;
}
