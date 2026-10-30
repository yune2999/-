// Encodes an original still, camera movement, light and embers into a local WebM.
// This helper is optional; the website only consumes the exported media file.
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire('C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const still = 'data:image/webp;base64,' + (await fs.readFile('public/images/ignite-stage.webp')).toString('base64');
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
try {
  const page = await browser.newPage();
  const video = await page.evaluate(async still => {
    const image = new Image(); image.src = still; await image.decode();
    const canvas = document.createElement('canvas'); canvas.width = 1600; canvas.height = 900;
    const ctx = canvas.getContext('2d');
    const stream = canvas.captureStream(24);
    const codec = MediaRecorder.isTypeSupported('video/webm;codecs=vp9') ? 'video/webm;codecs=vp9' : 'video/webm';
    const recorder = new MediaRecorder(stream, { mimeType: codec, videoBitsPerSecond: 3800000 });
    const chunks = []; recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
    const stopped = new Promise(resolve => { recorder.onstop = resolve; });
    const duration = 10000;
    const draw = elapsed => {
      const phase = elapsed / duration * Math.PI * 2;
      const zoom = 1.035 + .012 * Math.sin(phase);
      ctx.save(); ctx.translate(800, 450); ctx.scale(zoom, zoom);
      ctx.drawImage(image, -800 + 5 * Math.sin(phase), -450 + 3 * Math.cos(phase), 1600, 900); ctx.restore();
      const glow = ctx.createRadialGradient(1070, 350, 0, 1070, 350, 750);
      glow.addColorStop(0, `rgba(241,24,111,${.035 + .025 * Math.sin(phase)})`); glow.addColorStop(1, 'rgba(241,24,111,0)');
      ctx.fillStyle = glow; ctx.fillRect(0, 0, 1600, 900);
      for (let i = 0; i < 33; i++) {
        const y = 930 - ((elapsed / duration * 900 + i * 83.7) % 1000);
        const x = (i * 141.13 + 30 * Math.sin(phase + i)) % 1600;
        const opacity = Math.min(1, Math.max(0, (900-y)/100), Math.max(0, y/150)) * (.25 + (i%3)*.1);
        ctx.fillStyle = `rgba(255,${140+i%80},${110+i%40},${opacity})`;
        ctx.save(); ctx.translate(x, y); ctx.rotate(i + phase*.1); ctx.fillRect(-.7, -2, 1.4, i%3+2); ctx.restore();
      }
    };
    draw(0); recorder.start(); const start = performance.now();
    await new Promise(resolve => { const frame = now => { const time = now-start; draw(time); if(time < duration) requestAnimationFrame(frame); else resolve(); }; requestAnimationFrame(frame); });
    recorder.stop(); await stopped; stream.getTracks().forEach(track => track.stop());
    const blob = new Blob(chunks,{type:'video/webm'});
    return await new Promise(resolve => { const reader=new FileReader(); reader.onload=()=>resolve(reader.result.split(',')[1]); reader.readAsDataURL(blob); });
  }, still);
  await fs.mkdir('public/media',{recursive:true});
  await fs.writeFile('public/media/ignite-motion.webm',Buffer.from(video,'base64'));
  console.log('Exported local stage video with animated embers.');
} finally { await browser.close(); }
