const makeGetElement = require("../../libs/nativeMobileApp/getElement");
const makeTapElement = require("../../libs/nativeMobileApp/tapElement");
const makeSetValue = require("../../libs/nativeMobileApp/setValue");
const getKeyValue = require("../../libs/nativeMobileApp/getKeyValue");

const countries = require("../../phoneNumbers/data.json");

module.exports = (driver) =>
  async function phoneNumberInputScreen() {
    console.log(new Date(), "Screen:", "phoneNumberInputScreen", "\n");
    const getElement = makeGetElement(driver);
    const phoneInput = await getElement(
      'android=new UiSelector().className("android.widget.EditText").resourceId("phoneNumberId")'
    );

    if (phoneInput) {
      let isNumberInvalid = false;
      let numbers = [];

      const tapElement = makeTapElement(driver);
      const setValue = makeSetValue(driver);

      const nextButton = await getElement(
        'android=new UiSelector().text("NEXT").className("android.widget.Button")'
      );

      do {
        if (countries.length && !numbers.length) {
          const country = countries.filter((c) => c.numbers.length).shift();
          numbers = country.numbers;
        }

        const number = numbers.shift();
        if (!number) break;

        await tapElement(phoneInput);
        await phoneInput.clearValue();
        

        await setValue(getKeyValue(number));
        await tapElement(nextButton);

        const phoneUsedTooManyTime = await getElement(
          'android=new UiSelector().text("This phone number has been used too many times").className("android.view.View")',
          2000
        );

        const phoneCannotBeUsed = await getElement(
          'android=new UiSelector().text("This phone number cannot be used for verification").className("android.view.View")',
          2000
        );

        isNumberInvalid = Boolean(phoneUsedTooManyTime || phoneCannotBeUsed);
      } while (isNumberInvalid);

      if (isNumberInvalid) {
        await driver.deleteSession();
        throw new Error("No number can be registered");
      }
    }
  };
