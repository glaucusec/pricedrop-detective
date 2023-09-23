const puppeteerExtra = require("puppeteer-extra");
const stealth = require("puppeteer-extra-plugin-stealth");

puppeteerExtra.use(stealth());

const findProductData = async (url) => {
  let browser;

  return new Promise(async (resolve, reject) => {
    try {
      browser = await puppeteerExtra.launch({
        headless: "new",
        defaultViewport: null,
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

      resolve({ title, price, imageURL, rating: productRating });
    } catch (error) {
      console.error(`Error@findProductData: ${error}`);
      reject(error);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  });
};

const findDetailedProductInfo = async (url) => {
  let browser; // Declare browser variable outside the try-catch

  return new Promise(async (resolve, reject) => {
    try {
      browser = await puppeteerExtra.launch({
        headless: "new",
        defaultViewport: null,
        userDataDir: "./tmp",
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage();
      await page.goto(url);

      await page.waitForSelector(".a-normal.a-spacing-micro");

      const data = await page.evaluate(() => {
        const table = document.querySelector(".a-normal.a-spacing-micro");
        const rows = table.querySelectorAll("tr");

        const dataArray = [];

        rows.forEach((row) => {
          const columns = row.querySelectorAll("td");

          // Check if the row contains exactly 2 columns and does not have scripts
          if (columns.length === 2 && !row.querySelector("script")) {
            const key = columns[0].textContent.trim();
            const value = columns[1].textContent.trim();
            dataArray.push({ [key]: value });
          }
        });

        return dataArray;
      });

      resolve(data);
    } catch (error) {
      console.error(`Error@findDetailedProductInfo: ${error}`);
      reject(error);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  });
};

module.exports = { findProductData, findDetailedProductInfo };
