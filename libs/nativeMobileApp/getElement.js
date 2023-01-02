const between = require("../between");

module.exports = (driver) =>
  async function getElement(selector, timeout = 5000) {
    const element = await driver.$(selector);

    try {
      await driver.waitUntil(
        async () => {
          return await element.isDisplayed();
        },
        {
          timeout,
        }
      );

      await driver.pause(between(100, 500));

      console.log(new Date(), "getElement:", selector, "\n");
    } catch (err) {
      console.log("Element not found:", err);
      return;
    }

    return element;
  };
