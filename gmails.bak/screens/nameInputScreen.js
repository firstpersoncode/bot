const makeGetElement = require("../../libs/nativeMobileApp/getElement");
const makeTapElement = require("../../libs/nativeMobileApp/tapElement");
const makeSetValue = require("../../libs/nativeMobileApp/setValue");

module.exports = (driver, account) =>
  async function nameInputScreen() {
    console.log(new Date(), "Screen:", "nameInputScreen", "\n");
    const getElement = makeGetElement(driver);
    const nameInput = await getElement(
      'android=new UiSelector().className("android.widget.EditText").resourceId("firstName")'
    );

    const tapElement = makeTapElement(driver);
    await tapElement(nameInput);

    const setValue = makeSetValue(driver);
    await setValue(account.name);

    const nextButton = await getElement(
      'android=new UiSelector().text("NEXT").className("android.widget.Button")'
    );

    await tapElement(nextButton);
  };
