const makeGetElement = require("../../libs/nativeMobileApp/getElement");
const makeTapElement = require("../../libs/nativeMobileApp/tapElement");
const makeSetValue = require("../../libs/nativeMobileApp/setValue");

module.exports = (driver) =>
  async function verifyPinScreen() {
    console.log(new Date(), "Screen:", "verifyPinScreen", "\n");
    const getElement = makeGetElement(driver);
    const pinButton = await getElement(
      'android=new UiSelector().text("USE PIN").className("android.widget.Button")'
    );

    const tapElement = makeTapElement(driver);

    await tapElement(pinButton);
    const pinInput = await getElement(
      'android=new UiSelector().className("android.widget.EditText").index(3)'
    );

    await tapElement(pinInput);
    const setValue = makeSetValue(driver);
    await setValue("6666", driver);

    const confirmButton = await getElement(
      'android=new UiSelector().text("CONFIRM").className("android.widget.Button")'
    );
    await tapElement(confirmButton);
  };
