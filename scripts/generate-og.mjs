import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630 });
await page.goto('http://localhost:8787/og-image.html', { waitUntil: 'networkidle0' });
await page.screenshot({
  path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og-image.png'),
  type: 'png',
});
console.log('og-image.png saved to public/');
await browser.close();
