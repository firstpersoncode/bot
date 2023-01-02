const between = require("../between");

module.exports = (browser) =>
  async function inputValue(value) {
    let res = "";

    const arrValue = [...String(value)];

    console.log(new Date(), "setValue:", arrValue, "\n");

    for (let i = 0; i < arrValue.length; i++) {
      await browser.keys(arrValue[i]);
      await browser.pause(between(0, 300));
    }
  };
