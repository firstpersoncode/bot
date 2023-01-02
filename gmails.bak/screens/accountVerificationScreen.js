const makeGetElement = require("../../libs/nativeMobileApp/getElement");
const makeScrollElement = require("../../libs/nativeMobileApp/scrollToElement");
const makeTapElement = require("../../libs/nativeMobileApp/tapElement");

module.exports = (driver) =>
  async function accountVerificationScreen() {
    console.log(new Date(), "Screen:", "accountVerificationScreen", "\n");
    const skipButton = await driver.$(
      'android=new UiSelector().text("Skip").className("android.widget.Button")'
    );

    const scrollToElement = makeScrollElement(driver);
    await scrollToElement(skipButton, driver);

    const tapElement = makeTapElement(driver);
    await tapElement(skipButton);

    const getElement = makeGetElement(driver);

    const nextButton = await getElement(
      'android=new UiSelector().text("NEXT").className("android.widget.Button")'
    );

    await tapElement(nextButton);
  };
