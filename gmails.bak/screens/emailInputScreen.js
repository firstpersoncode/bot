const between = require("../../libs/between");
const makeGetElement = require("../../libs/nativeMobileApp/getElement");
const makeTapElement = require("../../libs/nativeMobileApp/tapElement");
const makeSetValue = require("../../libs/nativeMobileApp/setValue");

module.exports = (driver, account) =>
  async function emailInputScreen() {
    console.log(new Date(), "Screen:", "emailInputScreen", "\n");
    const getElement = makeGetElement(driver);
    const tapElement = makeTapElement(driver);

    const emailInput = await getElement(
      'android=new UiSelector().className("android.widget.EditText").index(0)'
    );

    if (emailInput) {
      await tapElement(emailInput);
      const setValue = makeSetValue(driver);
      await setValue(account.email);
      account.email = account.email + "@gmail.com";
    } else {
      const emailPicker = await getElement(
        `android=new UiSelector().className("android.view.View").resourceId("selectionc${between(
          0,
          1
        )}")`
      );

      await tapElement(emailPicker);
      account.email = await emailPicker.getText();
    }

    const nextButton = await getElement(
      'android=new UiSelector().text("NEXT").className("android.widget.Button")'
    );
    await tapElement(nextButton);
  };
