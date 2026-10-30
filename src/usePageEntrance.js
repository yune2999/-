import { useEffect } from 'react';

const targets = [
  '.reveal:not(.profile-layout):not(.profile-bottom)',
  '.chrome-lettering', '.person-scene', '.hero-identity', '.hero-note-right', '.chrome-caption', '.chrome-bottom',
  '.profile-portrait-column', '.profile-summary > .eyebrow', '.profile-summary > h2',
  '.profile-position', '.profile-intro', '.profile-contact', '.profile-editorial-note',
  '.profile-bottom', '.timeline-item', '.journey-footnote',
  '.work-toolbar', '.project-card', '.work-bottom', '.expertise-picker',
  '.contact .section-label', '.contact-main > *', '.contact footer',
  '.case-heading', '.case-cover', '.case-body > *'
].join(',');

export default function usePageEntrance({ paused, filter, selected }) {
  useEffect(() => {
    const elements = [...document.querySelectorAll(targets)];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reveal = element => {
      element.dataset.enterState = paused || reduced.matches ? 'done' : 'visible';
    };
    if (paused || reduced.matches || !('IntersectionObserver' in window)) {
      elements.forEach(element => { element.dataset.enterState = 'done'; });
      return;
    }
    // Stagger only elements entering together; later timeline rows never inherit a long delay.
    const observer = new IntersectionObserver(entries => {
      const entering = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      entering.forEach((entry, index) => {
        entry.target.style.setProperty('--enter-delay', `${Math.min(index, 3) * 40}ms`);
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px 100px 0px' });

    elements.forEach(element => {
      if (element.dataset.enterState === 'done' || element.dataset.enterState === 'visible') return;
      element.dataset.enter = element.closest('#home') ? 'fade' : 'rise';
      element.dataset.enterState = 'pending';
      observer.observe(element);
    });
    const finish = event => {
      if (event.animationName === 'page-enter-rise' || event.animationName === 'page-enter-fade') {
        event.target.dataset.enterState = 'done';
      }
    };
    const focus = event => {
      const element = event.target.closest('[data-enter-state="pending"]');
      if (element) { element.dataset.enterState = 'done'; observer.unobserve(element); }
    };
    const showAll = () => {
      if (reduced.matches) elements.forEach(element => { element.dataset.enterState = 'done'; });
    };
    document.addEventListener('animationend', finish);
    document.addEventListener('focusin', focus);
    reduced.addEventListener('change', showAll);
    return () => {
      observer.disconnect();
      document.removeEventListener('animationend', finish);
      document.removeEventListener('focusin', focus);
      reduced.removeEventListener('change', showAll);
    };
  }, [paused, filter, selected]);
}
