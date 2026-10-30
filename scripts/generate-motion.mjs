import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

// Optional development helper; the exported WebM is bundled with the site.
const require = createRequire('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svg = await fs.readFile(path.join(root, 'public/images/hero-sculpture.svg'), 'utf8');
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const data = await page.evaluate(async svg => {
    const canvas = document.createElement('canvas');
    canvas.width = 1280; canvas.height = 720;
    const context = canvas.getContext('2d');
    const art = new Image();
    art.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    await art.decode();
    const stream = canvas.captureStream(24);
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9', videoBitsPerSecond: 2400000 });
    const chunks = [];
    recorder.ondataavailable = e => { if(e.data.size) chunks.push(e.data); };
    const finished = new Promise(resolve => recorder.onstop = resolve);
    const draw = phase => {
      context.fillStyle = '#141916'; context.fillRect(0,0,1280,720);
      context.save();
      context.translate(880,346);
      context.rotate(Math.sin(phase) * .018);
      const scale = 1.035 + .015 * Math.cos(phase);
      context.scale(scale,scale);
      context.drawImage(art,-880,-346,1280,720);
      context.restore();
    };
    draw(0); recorder.start();
    const start = performance.now();
    await new Promise(resolve => {
      const tick = now => { const elapsed = now - start; draw(elapsed / 8000 * Math.PI * 2); if(elapsed < 8000) requestAnimationFrame(tick); else resolve(); };
      requestAnimationFrame(tick);
    });
    recorder.stop(); await finished;
    const blob = new Blob(chunks, { type: 'video/webm' });
    return await new Promise(resolve => { const reader = new FileReader(); reader.onload = () => resolve(reader.result.split(',')[1]); reader.readAsDataURL(blob); });
  }, svg);
  await fs.mkdir(path.join(root,'public/media'), { recursive: true });
  await fs.writeFile(path.join(root,'public/media/hero-motion.webm'),Buffer.from(data,'base64'));
  console.log('Created local hero WebM background.');
} finally { await browser.close(); }
