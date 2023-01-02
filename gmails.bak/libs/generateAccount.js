const between = require("../../libs/between");
const {
  generateName,
  generateEmail,
  generatePassword,
} = require("../../libs/generator");
const getKeyValue = require("../../libs/nativeMobileApp/getKeyValue");

module.exports = (account) =>
  function generateAccount() {
    console.log(new Date(), "Screen:", "generateAccount", "\n");
    const gender = between(0, 2);
    const name = generateName(gender);
    const email = generateEmail(name, generateName(gender));
    const password = generatePassword();
    const dob = {};
    dob.month = between(0, 11);
    dob.date = dob.month === 1 ? between(1, 28) : between(1, 30);
    dob.year = between(1980, 1995);

    account.gender = gender;
    account.name = getKeyValue(name);
    account.email = getKeyValue(email);
    account.password = getKeyValue(password);
    account.dob = dob;

    console.log(new Date(), "Account:", JSON.stringify(account, null, 2), "\n");
  };
