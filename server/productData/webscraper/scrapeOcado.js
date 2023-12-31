const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

// Use stealth plugin to prevent detection by websites
puppeteer.use(StealthPlugin());

// Define the search term and construct the URL for scraping
const ocadoFetchData = async (productName, quantity = 5) => {
  const url = `https://www.ocado.com/search?entry=${productName}`;

  // Main async function for web scraping
  return (async () => {
    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      headless: "new",
    });
    try {
      const page = await browser.newPage();

      // Navigate to the URL
      await page.goto(url, { waitUntil: "domcontentloaded" });

      // Accept cookies for seamless navigation
      const cookiesSelector = "#onetrust-accept-btn-handler";
      const cookieBtn = await page.waitForSelector(cookiesSelector);
      await cookieBtn.click();

      // Selector for product listings
      const productSelector = ".fops-item--cluster";
      // Check for product's existence
      try {
        await page.waitForSelector(productSelector);
      } catch (e) {
        console.log("No OCADO search results found for the term:", productName);
        await browser.close();
        return [];
      }
      await page.waitForSelector(productSelector);

      // Scrape the product names of the first five items
      const products = await page.$$eval(
        productSelector,
        (elements, quantity) =>
          elements.slice(0, quantity).map((el) => {
            //extracting price in pence
            const extractPrice = (el) => {
              const priceSpan = el.querySelector(".fop-price");
              if (!priceSpan) return null;

              const priceText = priceSpan.innerText.trim();
              if (priceText.endsWith("p")) {
                return parseInt(priceText.replace("p", ""), 10);
              } else {
                // Regex to match price in the format £x or £x.xx
                const match = priceText.match(/£?(\d+(\.\d+)?)/);
                if (match && match[1]) {
                  return Math.round(parseFloat(match[1]) * 100);
                } else {
                  // Handling unexpected price formats
                  console.error("Unexpected price format:", priceText);
                  return null;
                }
              }
            };

            const extractPricePerUnit = (el) => {
              const pricePerUnitElement = el.querySelector(".fop-unit-price");
              if (!pricePerUnitElement)
                return { unit_price: undefined, unit_measure: undefined };

              const fullText = pricePerUnitElement.innerText.trim();

              // Extracting the numeric value and the unit of measurement
              // This regex matches both £x.xx and xx.xp formats
              const priceMatch = fullText.match(
                /(£\d+\.\d+|\d+\.?\d+p)(?: per )(\w+)/
              );
              if (!priceMatch) {
                console.error("Unexpected price per unit format:", fullText);
                return { unit_price: undefined, unit_measure: undefined };
              }

              let unit_price;
              const priceText = priceMatch[1];
              const unit_measure = priceMatch[2];

              if (priceText.includes("£")) {
                // Convert pounds to pence
                unit_price = Math.round(
                  parseFloat(priceText.replace("£", "")) * 100
                );
              } else if (priceText.endsWith("p")) {
                // Convert pence to integer
                unit_price = Math.round(parseFloat(priceText.replace("p", "")));
              }

              return { unit_price, unit_measure };
            };

            //extract brand function
            const extractBrand = (name) => {
              const words = name.split(" ");
              let brand = words[0];
              if (
                words.length > 1 &&
                (words[1] === "&" || words[1].length <= 2)
              ) {
                brand += ` ${words[1]} ${words[2]}`;
              }
              return brand;
            };

            const name = el
              .querySelector(
                "li.fops-item.fops-item--cluster h4.fop-title > span"
              )
              .innerText.trim();
            const price = extractPrice(el);
            const { unit_price, unit_measure } = extractPricePerUnit(el);
            const image = el.querySelector(".fop-img").src;
            const brand = extractBrand(name);
            // // Extracting the category
            // const categoryElement = el.querySelector(".fop-ribbon__title");
            // let category_name = "";
            // if (categoryElement) {
            //   const fullCategoryText = categoryElement.title.trim();
            //   category_name = fullCategoryText.split("»")[0].trim();
            // }

            // Extracting the SKU ID
            const sku_id = el
              .querySelector(".fop-item")
              ?.getAttribute("data-sku");
            const sku_ids = [sku_id];
            const url = el.querySelector(
              ".fop-contentWrapper > a:first-child"
            ).href;

            return {
              supermarket: "ocado",
              sku_id,
              sku_ids,
              name,
              brand,
              // description: "",
              // category_name,
              image,
              price_info: {
                price,
                unit_price,
                unit_measure,
              },
              // url,
            };
          }),
        quantity
      );

      // ****COMMENTED OUT DUE TO PERFORMANCE****

      // const processProduct = async (product) => {
      //   const newTab = await browser.newPage();
      //   try {
      //     await newTab.goto(product.url, { waitUntil: "domcontentloaded" });

      //     // Selector for product description and brand
      //     const descriptionSelector = ".bop-info__content";

      //     // Extract product description
      //     const description = await newTab.$eval(descriptionSelector, (el) =>
      //       el.innerText.trim()
      //     );
      //     product.description = description;

      //     delete product.url;
      //   } catch (e) {
      //     console.error(
      //       `OCADO - Error processing product ${product.sku_id}: ${e.message}`
      //     );
      //     // setting default values
      //     product.description = null;
      //   } finally {
      //     if (newTab) {
      //       await newTab.close();
      //     }
      //   }
      // };
      // await Promise.all(products.map(processProduct));
      // test log
      // console.log(products);
      return products;
    } catch (e) {
      console.log(
        `OCADO - Error fetching data for ${productName} at ${url}: ${e.message}`
      );
      return [];
    } finally {
      await browser.close();
    }
  })();
};

// testing data fetch
// ocadoFetchData("pepsi");
module.exports = { ocadoFetchData };
