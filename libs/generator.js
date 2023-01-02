const humanNames = require("human-names");
const generator = require("generate-password");
const between = require("./between");

function generateName(gender) {
  const name =
    gender === 2
      ? [
          humanNames.allRandom(),
          humanNames.allRandomDe(),
          humanNames.allRandomEn(),
          humanNames.allRandomEs(),
          humanNames.allRandomFr(),
          humanNames.allRandomIt(),
          humanNames.allRandomNl(),
        ][between(0, 6)]
      : gender === 0
      ? [
          humanNames.femaleRandom(),
          humanNames.femaleRandomDe(),
          humanNames.femaleRandomEn(),
          humanNames.femaleRandomEs(),
          humanNames.femaleRandomFr(),
          humanNames.femaleRandomIt(),
          humanNames.femaleRandomNl(),
        ][between(0, 6)]
      : [
          humanNames.maleRandom(),
          humanNames.maleRandomDe(),
          humanNames.maleRandomEn(),
          humanNames.maleRandomEs(),
          humanNames.maleRandomFr(),
          humanNames.maleRandomIt(),
          humanNames.maleRandomNl(),
        ][between(0, 6)];

  return name;
}

function generateEmail(firstName, lastName) {
  return `${firstName.toLowerCase().split(" ").join("")}.${lastName
    .toLowerCase()
    .split(" ")
    .join("")}${Math.floor(Date.now() / 10000000)}`;
}

function generateEmailPicker() {
  return `selectionc${between(0, 1)}`;
}

function generatePassword() {
  const password = generator.generate({
    numbers: true,
    symbols: true,
    exclude: "\\",
    strict: true,
  });

  return password;
}

module.exports = {
  generateName,
  generateEmail,
  generateEmailPicker,
  generatePassword,
};
