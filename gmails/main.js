// const fs = require("fs");
const wdio = require("webdriverio");
const browserConfig = require("./browser.config.json");
const data = require("./data.json");
const countries = require("../phoneNumbers/data.json");

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
    "remote started:",
    JSON.stringify(browserConfig, null, 2),
    "\n"
  );

  const browser = await wdio.remote(browserConfig);
  const inputValue = makeInputValue(browser);
  const waitUntilLoad = makeWaitUntilLoad(browser);
  const waitUntilElementVisible = makeWaitUntilElementVisible(browser);

  await browser.url("https://accounts.google.com/signup/v2/webcreateaccount");
  await waitUntilLoad();

  const createAccountButton = await browser.$(".dqyqtf .XOrBDc .ZOeJnf");
  await createAccountButton.click();
  const forPersonalUseButtons = await browser.$$(
    ".VfPpkd-xl07Ob-XxIAqe .VfPpkd-StrnGf-rymPhb li"
  );
  if (forPersonalUseButtons?.length) {
    const forPersonalUseButton = forPersonalUseButtons[0];
    await forPersonalUseButton.click();
  }

  await waitUntilLoad();

  const firstNameField = await browser.$("#firstName");
  await waitUntilElementVisible(firstNameField);
  await firstNameField.click();
  await inputValue("Andy");
  const lastNameField = await browser.$("#lastName");
  await lastNameField.click();
  await inputValue("Dimas");
  const userNameField = await browser.$("#username");
  await userNameField.click();
  await inputValue("andy.dimas32312");
  const displayPasswdField = await browser.$(".enBDyd .VfPpkd-muHVFf-bMcfAe");
  await displayPasswdField.click();
  const passwdField = await browser.$("#passwd");
  await passwdField.click();
  await inputValue("123456@Bnm");
  const confirmPasswdField = await browser.$("#confirm-passwd");
  await confirmPasswdField.click();
  await inputValue("123456@Bnm");
  const accountDetailsNextButton = await browser.$("#accountDetailsNext");
  await accountDetailsNextButton.click();

  await waitUntilLoad();

  const phoneNumberField = await browser.$("#phoneNumberId");
  await waitUntilElementVisible(phoneNumberField);
  await phoneNumberField.click();
  const accountVerifynextButton = await browser.$(".dG5hZc .qhFLie .FliLIb");

  let isValidNumber = false;
  let numbers = [];
  do {
    if (!numbers.length) {
      const country = countries.shift();
      if (country?.numbers?.length) numbers = country.numbers;
    }
    const number = numbers.shift();
    if (!number) break;

    await phoneNumberField.click();
    await phoneNumberField.clearValue();
    await browser.pause(1000);
    await inputValue(number);

    await accountVerifynextButton.click();
    await browser.pause(2000);

    try {
      const warning = await browser.$(".jPtpFe .o6cuMc");
      await waitUntilElementVisible(warning, 1000);
    } catch (err) {
      console.error(err);
    }
    // isValidNumber = !(await warning.isDisplayed());
  } while (!isValidNumber);

  // await browser.deleteSession();
}

main();
