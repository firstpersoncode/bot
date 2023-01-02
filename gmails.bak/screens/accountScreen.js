const makeGetElement = require("../../libs/nativeMobileApp/getElement");
const makeTapElement = require("../../libs/nativeMobileApp/tapElement");

module.exports = (driver) =>
  async function accountScreen() {
    console.log(new Date(), "Screen:", "accountScreen", "\n");
    const getElement = makeGetElement(driver);
    const createAccountButton = await getElement(
      'android=new UiSelector().text("Create account").className("android.widget.Spinner")',
      15000
    );

    const tapElement = makeTapElement(driver);
    await tapElement(createAccountButton);

    const forMySelfButton = await getElement(
      'android=new UiSelector().text("For myself").className("android.view.MenuItem")'
    );

    await tapElement(forMySelfButton);
  };
