import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generateDashboardPreview() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to match the dashboard dimensions
  await page.setViewport({
    width: 1240,
    height: 840
  });
  
  // Load the HTML file
  await page.goto(`file://${join(__dirname, '../public/dashboard-preview.html')}`);
  
  // Wait for a moment to ensure everything is rendered
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Take the screenshot
  await page.screenshot({
    path: join(__dirname, '../public/dashboard-preview.png'),
    quality: 100
  });
  
  await browser.close();
}

generateDashboardPreview().catch(console.error); 