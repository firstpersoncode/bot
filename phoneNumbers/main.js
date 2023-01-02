const fs = require("fs");
const wdio = require("webdriverio");
const browserConfig = require("./browser.config.json");
let data = require("./data.json");

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const makeWaitUntilLoad = (browser) =>
  async function waitUntilLoad(timeout = 60 * 1000) {
    await browser.waitUntil(
      async () =>
        await browser.execute(() => document.readyState === "complete"),
      { timeout }
    );

    console.log(new Date(), "document is ready", "\n");
    return await browser.pause(1000);
  };

const makeWaitUntilElementVisible = (browser) =>
  async function waitUntilElementVisible(element, timeout = 60 * 1000) {
    await browser.waitUntil(async () => await element.isDisplayed(), {
      timeout,
    });

    console.log(new Date(), "element is visible", "\n");
    return await browser.pause(1000);
  };

const makeInputValue = (browser) =>
  async function inputValue(value) {
    const arrValue = [...String(value)];

    console.log(new Date(), "set value:", arrValue, "\n");

    for (let i = 0; i < arrValue.length; i++) {
      await browser.keys(arrValue[i]);
      await browser.pause(between(0, 300));
    }
  };

async function main() {
  console.log(
    new Date(),
    "Remote started:",
    JSON.stringify(browserConfig, null, 2),
    "\n"
  );

  const browser = await wdio.remote(browserConfig);
  const inputValue = makeInputValue(browser);
  const waitUntilLoad = makeWaitUntilLoad(browser);
  const waitUntilElementVisible = makeWaitUntilElementVisible(browser);

  await browser.url("https://www.receivesms.co/");
  await waitUntilLoad();
  data = [];

  const countries = await browser.$$(".row .table tbody tr");

  for (const country of countries) {
    const col = await country.shadow$(".table_link");
    const name = await col.getText();
    const link = await col.shadow$("a");
    const url = await link.getAttribute("href");
    const slug = name.trim().toLowerCase().split(" ").join("-");
    const countryData = { country: slug, numbers: [] };

    await browser.newWindow(`https://www.receivesms.co${url}`);
    await browser.pause(1000);
    const handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    const table = await browser.$(".row .table");
    await waitUntilElementVisible(table);

    const numbers = await browser.$$(".row .table tbody tr");

    for (const row of numbers) {
      const col = await row.shadow$(".btn");
      const number = await col.getText();
      countryData.numbers.push(number);
    }

    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);

    data.push(countryData);
    fs.writeFileSync("./phoneNumbers/data.json", JSON.stringify(data, null, 2));
  }

  await browser.deleteSession();
}

main();
