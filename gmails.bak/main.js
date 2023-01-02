const wdio = require("webdriverio");

const makeSettingsScreen = require("./screens/settingsScreen");
const makeAccountsScreen = require("./screens/accountsScreen");
const makeAddAnAccountScreen = require("./screens/addAnAccountScreen");
// const makeVerifyPinScreen = require("./screens/verifyPinScreen");
const makeAccountScreen = require("./screens/accountScreen");
const makeNameInputScreen = require("./screens/nameInputScreen");
const makeDobAndGenderInputScreen = require("./screens/dobAndGenderInputScreen");
const makeEmailInputScreen = require("./screens/emailInputScreen");
const makePasswordInputScreen = require("./screens/passwordInputScreen");
const makePhoneNumberInputScreen = require("./screens/phoneNumberInputScreen");
const makeCodeInputScreen = require("./screens/codeInputScreen");
const makeAccountVerificationScreen = require("./screens/accountVerificationScreen");
const makeAccountReviewScreen = require("./screens/accountReviewScreen");
const makeAccountAgreementScreen = require("./screens/accountAgreementScreen");

const makeGenerateAccount = require("./libs/generateAccount");
const makeGenerateAccountFile = require("./libs/generateAccountFile");

const config = require("./appium.config.json");

function buildConfig(udid, deviceName = "VirtualAndroid11") {
  const res = { ...config };
  res.capabilities["appium:udid"] = udid;
  res.capabilities["appium:deviceName"] = deviceName;

  return res;
}

async function main() {
  const appiumConfig = buildConfig(process.argv[2], process.argv[3]);
  console.log(
    new Date(),
    "Remote started:",
    JSON.stringify(appiumConfig, null, 2),
    "\n"
  );

  const driver = await wdio.remote(appiumConfig);

  let recurring = false;

  while (true) {
    const account = {};
    const generateAccount = makeGenerateAccount(account);
    const settingsScreen = makeSettingsScreen(driver);
    const accountsScreen = makeAccountsScreen(driver);
    const addAnAccountScreen = makeAddAnAccountScreen(driver);
    // const verifyPinScreen = makeVerifyPinScreen();
    const accountScreen = makeAccountScreen(driver);
    const nameInputScreen = makeNameInputScreen(driver, account);
    const dobAndGenderInputScreen = makeDobAndGenderInputScreen(
      driver,
      account
    );
    const emailInputScreen = makeEmailInputScreen(driver, account);
    const passwordInputScreen = makePasswordInputScreen(driver, account);
    const phoneNumberInputScreen = makePhoneNumberInputScreen(driver);
    const codeInputScreen = makeCodeInputScreen(driver);
    const accountVerificationScreen = makeAccountVerificationScreen(driver);
    const accountReviewScreen = makeAccountReviewScreen(driver);
    const accountAgreementScreen = makeAccountAgreementScreen(driver);
    const generateAccountFile = makeGenerateAccountFile(account);

    generateAccount();
    if (!recurring) await settingsScreen();
    await accountsScreen();
    await addAnAccountScreen();
    // await verifyPinScreen()
    await accountScreen();
    await nameInputScreen();
    await dobAndGenderInputScreen();
    await emailInputScreen();
    await passwordInputScreen();
    await phoneNumberInputScreen();
    await codeInputScreen();
    await accountVerificationScreen();
    await accountReviewScreen();
    await accountAgreementScreen();
    await generateAccountFile();

    recurring = true;
  }
}

main();
