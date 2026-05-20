const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/es', { waitUntil: 'networkidle2' });
  
  const bodyStyles = await page.evaluate(() => {
    const style = window.getComputedStyle(document.body);
    return {
      backgroundColor: style.backgroundColor,
      color: style.color,
      display: style.display,
      htmlClass: document.documentElement.className,
      bodyClass: document.body.className
    };
  });
  
  const h1Styles = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    if (!h1) return null;
    const style = window.getComputedStyle(h1);
    return {
      color: style.color,
      fontFamily: style.fontFamily
    };
  });

  console.log('Body Styles:', bodyStyles);
  console.log('H1 Styles:', h1Styles);
  
  await page.screenshot({ path: 'screenshot.png' });
  
  await browser.close();
})();
