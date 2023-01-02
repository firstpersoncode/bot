const fs = require("fs");
const makeSetValue = require("../../libs/nativeMobileApp/setValue");

const currData = require("../data.json");

let data = { ...currData };

module.exports = (account) =>
  async function generateAccountFile() {
    const gender = account.gender;
    const setValue = makeSetValue();
    const name = await setValue(account.name);
    const email = await setValue(account.email);
    const password = await setValue(account.password);
    const dob = account.dob;
    dob.month = String(Number(dob.month) + 1);

    const newAccount = {
      id: Date.now(),
      gender,
      name,
      email,
      password,
      dob,
    };

    data.push(newAccount);

    fs.writeFileSync("./gmails/data.json", JSON.stringify(data, null, 2));

    console.log(
      new Date(),
      "Account created:",
      JSON.stringify(newAccount, null, 2),
      "\n"
    );
  };
