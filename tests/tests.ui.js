const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page
  .on('console', message =>
    console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))

  await page.goto(`file://${__dirname}/../index.html`);


  await page.type('#billAmount', '10.00');
  page.keyboard.press('Enter');

  
  const element = await page.waitForSelector('#tipAmount'); 
  const value = await element.evaluate(el => el.textContent);


  console.log('tip amt:', value);

  await browser.close();
})();