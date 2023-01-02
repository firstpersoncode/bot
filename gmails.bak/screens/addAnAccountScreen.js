const makeGetElement = require("../../libs/nativeMobileApp/getElement");
const makeTapElement = require("../../libs/nativeMobileApp/tapElement");

module.exports = (driver) =>
  async function addAnAccountScreen() {
    console.log(new Date(), "Screen:", "addAnAccountScreen", "\n");
    const getElement = makeGetElement(driver);
    const googleButton = await getElement(
      'android=new UiSelector().text("Google").className("android.widget.TextView")'
    );

    const tapElement = makeTapElement(driver);
    await tapElement(googleButton);
  };
