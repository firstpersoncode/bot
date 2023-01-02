const makeGetElement = require("../../libs/nativeMobileApp/getElement");
const makeTapElement = require("../../libs/nativeMobileApp/tapElement");

module.exports = (driver) =>
  async function codeInputScreen() {
    console.log(new Date(), "Screen:", "codeInputScreen", "\n");
    const getElement = makeGetElement(driver);
    const codeInput = await getElement(
      'android=new UiSelector().className("android.widget.EditText").resourceId("code")'
    );

    if (codeInput) {
      let codeValue;
      let proceed = false;

      do {
        codeValue = await codeInput.getText();
        proceed = codeValue?.length === 6;
      } while (!proceed);

      const nextButton = await getElement(
        'android=new UiSelector().text("NEXT").className("android.widget.Button")'
      );
      const tapElement = makeTapElement(driver);
      await tapElement(nextButton);
    }
  };
