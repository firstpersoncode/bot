const makeGetElement = require("../../libs/nativeMobileApp/getElement");
const makeTapElement = require("../../libs/nativeMobileApp/tapElement");

module.exports = (driver) =>
  async function accountReviewScreen() {
    console.log(new Date(), "Screen:", "accountReviewScreen", "\n");
    const getElement = makeGetElement(driver);

    const nextButton = await getElement(
      'android=new UiSelector().text("NEXT").className("android.widget.Button")'
    );

    const tapElement = makeTapElement(driver);
    await tapElement(nextButton);
  };
