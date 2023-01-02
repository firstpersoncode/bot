const between = require("../between");

module.exports = (driver) =>
  async function scrollToElement(element) {
    let isDisplayed = await element.isDisplayed();

    while (!isDisplayed) {
      const actions = [
        { action: "longPress", x: 0, y: 1000 },
        { action: "moveTo", x: 0, y: between(100, 300) },
        "release",
      ];

      await driver.touchAction(actions);

      isDisplayed = await element.isDisplayed();
      await driver.pause(between(10, 50));

      console.log(
        new Date(),
        "scrollToElement:",
        JSON.stringify([...actions, { isDisplayed }], null, 2),
        "\n"
      );
    }
  };
