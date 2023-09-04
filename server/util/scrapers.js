const puppeteerExtra = require("puppeteer-extra");
const stealth = require("puppeteer-extra-plugin-stealth");

puppeteerExtra.use(stealth());

const findProductData = async (url) => {
  return new Promise(async (resolve, reject) => {
    let title = "";
    let price = "";
    try {
      const browser = await puppeteerExtra.launch({
        headless: "new",
        defaultViewport: false,
        userDataDir: "./tmp",
      });
      const page = await browser.newPage();
      await page.goto(url);

      const productTitle = await page.$("#productTitle");
      const productPrice = await page.$(".a-price-whole");

      if (!productTitle || !productPrice) {
        throw new Error("Product title or price not found.");
      }
      title = await productTitle.evaluate((element) => element.innerText);
      price = await productPrice.evaluate((element) => element.innerText);

      await browser.close();
      resolve({ title, price });
    } catch (error) {
      reject(`Error: ${error.message}`);
    }
  });
};

module.exports = { findProductData };
