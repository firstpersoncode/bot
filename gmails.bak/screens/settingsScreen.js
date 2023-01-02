const makeScrollElement = require("../../libs/nativeMobileApp/scrollToElement");
const makeTapElement = require("../../libs/nativeMobileApp/tapElement");

module.exports = (driver) =>
  async function settingsScreen() {
    console.log(new Date(), "Screen:", "settingsScreen", "\n");

    const accountsButton = await driver.$(
      'android=new UiSelector().text("Accounts").className("android.widget.TextView")'
    );

    const scrollToElement = makeScrollElement(driver);
    await scrollToElement(accountsButton);
    const tapElement = makeTapElement(driver);
    await tapElement(accountsButton);
  };
