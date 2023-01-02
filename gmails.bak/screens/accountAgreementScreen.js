const between = require("../../libs/between");
const makeScrollElement = require("../../libs/nativeMobileApp/scrollToElement");
const makeTapElement = require("../../libs/nativeMobileApp/tapElement");

module.exports = (driver) =>
  async function finishingScreen() {
    console.log(new Date(), "Screen:", "finishingScreen", "\n");
    await driver.pause(between(500, 1000));
    const agreeButton = await driver.$(
      'android=new UiSelector().text("I agree").className("android.widget.Button")'
    );

    const scrollToElement = makeScrollElement(driver);
    await scrollToElement(agreeButton, driver);
    const tapElement = makeTapElement(driver);
    await tapElement(agreeButton);
  };
