const between = require("../between");

module.exports = (driver) =>
  async function tapElement(element, timeout = 5000) {
    await driver.waitUntil(
      async () => {
        return await element.isDisplayed();
      },
      {
        timeout,
      }
    );

    await driver.pause(between(100, 500));

    await element.click();

    console.log(new Date(), "tapElement:", element.selector, "\n");
  };
