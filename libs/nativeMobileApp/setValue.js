const between = require("../between");

const KEYMAP = {
  "^0": ")",
  "^1": "!",
  "^2": "@",
  "^3": "#",
  "^4": "$",
  "^5": "%",
  "^6": "^",
  "^7": "&",
  "^8": "*",
  "^9": "(",

  "^a": "A",
  "^b": "B",
  "^c": "C",
  "^d": "D",
  "^e": "E",
  "^f": "F",
  "^g": "G",
  "^h": "H",
  "^i": "I",
  "^j": "J",
  "^k": "K",
  "^l": "L",
  "^m": "M",
  "^n": "N",
  "^o": "O",
  "^p": "P",
  "^q": "Q",
  "^r": "R",
  "^s": "S",
  "^t": "T",
  "^u": "U",
  "^v": "V",
  "^w": "W",
  "^x": "X",
  "^y": "Y",
  "^z": "Z",

  "^,": "<",
  "^.": ">",
  "^`": "~",
  "^-": "_",
  "^=": "+",
  "^[": "{",
  "^]": "}",
  "^\\": "|",
  "^;": ":",
  "^'": '"',
  "^/": "?",
};

const KEYCODE = {
  0: 7,
  1: 8,
  2: 9,
  3: 10,
  4: 11,
  5: 12,
  6: 13,
  7: 14,
  8: 15,
  9: 16,

  a: 29,
  b: 30,
  c: 31,
  d: 32,
  e: 33,
  f: 34,
  g: 35,
  h: 36,
  i: 37,
  j: 38,
  k: 39,
  l: 40,
  m: 41,
  n: 42,
  o: 43,
  p: 44,
  q: 45,
  r: 46,
  s: 47,
  t: 48,
  u: 49,
  v: 50,
  w: 51,
  x: 52,
  y: 53,
  z: 54,

  ",": 55,
  ".": 56,
  " ": 62,
  "`": 68,
  "-": 69,
  "=": 70,
  "[": 71,
  "]": 72,
  "\\": 73,
  ";": 74,
  "'": 75,
  "/": 76,
};

module.exports = (driver) =>
  async function setValue(value) {
    let res = "";

    const arrValue = [...String(value).toLowerCase()];

    console.log(new Date(), "setValue:", arrValue, "\n");

    for (let i = 0; i < arrValue.length; i++) {
      if (arrValue[i] === "^" && i + 1 <= arrValue.length) {
        res += KEYMAP[`^${arrValue[i + 1]}`];
        if (driver) await driver?.pressKeyCode(KEYCODE[arrValue[i + 1]], 64);
        i++;
      } else {
        res += arrValue[i];
        if (driver) await driver?.pressKeyCode(KEYCODE[arrValue[i]]);
      }

      if (driver) await driver?.pause(between(10, 50));
    }

    return res;
  };
