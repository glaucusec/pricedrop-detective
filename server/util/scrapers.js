const puppeteerExtra = require("puppeteer-extra");
const stealth = require("puppeteer-extra-plugin-stealth");

puppeteerExtra.use(stealth());

const findProductData = async (url) => {
  return new Promise(async (resolve, reject) => {
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
      const productImageURL = await page.$("#landingImage");

      if (!productTitle || !productPrice) {
        throw new Error("Product title or price not found.");
      }
      let title = await productTitle.evaluate((element) => element.innerText);
      let price = await productPrice.evaluate((element) => element.innerText);
      let imageURL = await productImageURL.evaluate((element) =>
        element.getAttribute("src")
      );

      await browser.close();
      resolve({ title, price, imageURL });
    } catch (error) {
      reject(`Error: ${error.message}`);
    }
  });
};

module.exports = { findProductData };
