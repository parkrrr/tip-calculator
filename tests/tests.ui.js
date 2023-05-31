const puppeteer = require('puppeteer');

QUnit.module('Basic functionality test', hooks => {
  QUnit.test("No rounding", async assert => {
    await launchBrowser(async page => {
      await page.type('#billAmount', '10.00');
      page.keyboard.press('Enter');


      const element = await page.waitForSelector('#tipAmount');
      const value = await element.evaluate(el => el.textContent);
      assert.equal(value, "2.00 (20.0%)")
    }, "1");
  });

  QUnit.test("Round up", async assert => {
    await launchBrowser(async page => {
      await page.type('#billAmount', '10.50');
      page.keyboard.press('Enter');
      await page.click("#roundUp")

      const element = await page.waitForSelector('#total');
      const value = await element.evaluate(el => el.textContent);
      assert.equal(value, "13.00");
    }, "2");
  });

  QUnit.test("Round down", async assert => {
    await launchBrowser(async page => {
      await page.type('#billAmount', '10.50');
      page.keyboard.press('Enter');
      await page.click("#roundDown")

      const element = await page.waitForSelector('#total');
      const value = await element.evaluate(el => el.textContent);
      assert.equal(value, "12.00");
    }, "3");
  });
});

QUnit.module('Adjusting tip percentage', hooks => {
  QUnit.test("Increase tip", async assert => {
    await launchBrowser(async page => {
      // click 5 times to get to 25%
      for(let i = 0; i < 5; i++) {
        await page.click("#tipPercentAdd");
      }
    
      await page.type('#billAmount', '10.50');
      await page.click("#roundUp");

      const element = await page.waitForSelector('#total');
      const value = await element.evaluate(el => el.textContent);
      assert.equal(value, "14.00")
    }, "4");
  });

  QUnit.test("Decrease tip", async assert => {
    await launchBrowser(async page => {
      // click 10 times to get to 10%
      for(let i = 0; i < 10; i++) {
        await page.click("#tipPercentSubtract");
      }

      await page.type('#billAmount', '10.50');
      await page.click("#roundUp");

      const element = await page.waitForSelector('#total');
      const value = await element.evaluate(el => el.textContent);
      assert.equal(value, "12.00")
    }, "5");
  });

  QUnit.test("Specify tip", async assert => {
    await launchBrowser(async page => {
      await page.type('#billAmount', '10.50');

      // remove the default 20%
      await page.evaluate(() => document.getElementById("tipPercent").value = "")

      await page.type('#tipPercent', '50');
      await page.click("#roundUp");

      const element = await page.waitForSelector('#total');
      const value = await element.evaluate(el => el.textContent);
      assert.equal(value, "16.00");
    }, "6");
  });
});

async function launchBrowser(fn, filename, args) {
  let browser = null;
  try {
    browser = await puppeteer.launch({...args, headless: "new" });
    const page = await browser.newPage();

    await page.emulate(puppeteer.devices["Pixel 5"]);

    page.on('console', message => console.log(`${message.type()} ${message.text()}`))
        .on('pageerror', message => console.log(message))
        .on('requestfailed', request => console.log(`${request.failure().errorText} ${request.url()}`));

    await page.goto(`http://localhost:8080/index.html`);
    await fn(page);
    await page.screenshot({ path: `screenshots\\${filename}.png` });
  }
  catch (err) {
    console.error(err);
    throw err;
  }
  finally {
    await browser.close();
  }
}