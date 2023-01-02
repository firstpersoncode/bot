const makeGetElement = require("../../libs/nativeMobileApp/getElement");
const makeTapElement = require("../../libs/nativeMobileApp/tapElement");

module.exports = (driver) =>
  async function accountsScreen() {
    console.log(new Date(), "Screen:", "accountsScreen", "\n");
    const getElement = makeGetElement(driver);
    const addAccountButton = await getElement(
      'android=new UiSelector().text("Add account").className("android.widget.TextView")'
    );

    const tapElement = makeTapElement(driver);
    await tapElement(addAccountButton);
  };
