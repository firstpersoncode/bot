const makeGetElement = require("../../libs/nativeMobileApp/getElement");
const makeTapElement = require("../../libs/nativeMobileApp/tapElement");
const makeSetValue = require("../../libs/nativeMobileApp/setValue");

module.exports = (driver, account) =>
  async function dobAndGenderInputScreen() {
    console.log(new Date(), "Screen:", "dobAndGenderInputScreen", "\n");
    const getElement = makeGetElement(driver);
    const monthInput = await getElement(
      'android=new UiSelector().className("android.widget.Spinner").resourceId("month")'
    );

    const tapElement = makeTapElement(driver);
    await tapElement(monthInput);

    const monthSelectInput = await getElement(
      `android=new UiSelector().className("android.widget.CheckedTextView").index(${account.dob.month})`
    );
    await tapElement(monthSelectInput);

    const dayInput = await getElement(
      'android=new UiSelector().className("android.widget.EditText").resourceId("day")'
    );

    await tapElement(dayInput);

    const setValue = makeSetValue(driver);
    await setValue(account.dob.date);

    const yearInput = await getElement(
      'android=new UiSelector().className("android.widget.EditText").resourceId("year")'
    );

    await tapElement(yearInput);
    await setValue(account.dob.year);

    const genderInput = await getElement(
      'android=new UiSelector().className("android.widget.Spinner").resourceId("gender")'
    );
    await tapElement(genderInput);

    const genderSelectInput = await getElement(
      `android=new UiSelector().className("android.widget.CheckedTextView").index(${account.gender})`
    );
    await tapElement(genderSelectInput);

    const nextButton = await getElement(
      'android=new UiSelector().text("NEXT").className("android.widget.Button")'
    );
    await tapElement(nextButton);
  };
