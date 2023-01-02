const makeGetElement = require("../../libs/nativeMobileApp/getElement");
const makeTapElement = require("../../libs/nativeMobileApp/tapElement");
const makeSetValue = require("../../libs/nativeMobileApp/setValue");

module.exports = (driver, account) =>
  async function passwordInputScreen() {
    console.log(new Date(), "Screen:", "passwordInputScreen", "\n");
    const getElement = makeGetElement(driver);
    const passwordInput = await getElement(
      'android=new UiSelector().className("android.widget.EditText").index(0)'
    );

    const tapElement = makeTapElement(driver);
    await tapElement(passwordInput);

    const setValue = makeSetValue(driver);
    await setValue(account.password, driver);

    const nextButton = await getElement(
      'android=new UiSelector().text("NEXT").className("android.widget.Button")'
    );
    await tapElement(nextButton);
  };
