const puppeteerExtra = require("puppeteer-extra");
const stealth = require("puppeteer-extra-plugin-stealth");

puppeteerExtra.use(stealth());

const findProductData = async (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteerExtra.launch({
        headless: false,
        defaultViewport: false,
        userDataDir: "./tmp",
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage();
      await page.goto(url);

      const productTitle = await page.$("#productTitle");
      const productPrice = await page.$(".a-price-whole");
      const productImageURL = await page.$("#landingImage");
      const productRating = await page.$eval(
        "#averageCustomerReviews_feature_div > div:nth-child(2) > span:nth-child(1) > span:nth-child(1) > span:nth-child(1) > a:nth-child(1) > span:nth-child(1)",
        (element) => element.innerText
      );

      if (
        !productTitle ||
        !productPrice ||
        !productImageURL ||
        !productRating
      ) {
        throw new Error("Product title/price/imageURL/rating not found.");
      }
      let title = await productTitle.evaluate((element) => element.innerText);
      let price = await productPrice.evaluate((element) => element.innerText);
      let imageURL = await productImageURL.evaluate((element) =>
        element.getAttribute("src")
      );

      await browser.close();
      resolve({ title, price, imageURL, rating: productRating });
    } catch (error) {
      console.log(error);
      reject(`Error@scraper.js: ${error}`);
    }
  });
};

module.exports = { findProductData };
