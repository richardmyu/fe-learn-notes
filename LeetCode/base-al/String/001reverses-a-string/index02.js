export const reverseString = s => {
  let length = s.length;
  let lang = Math.floor(length / 2);
  let str = "";
  for (let i = 0; i < lang; i++) {
    if (s[i] === s[length - i - 1]) {
      continue;
    }
    str = s[i];
    s[i] = s[length - i - 1];
    s[length - i - 1] = str;
  }
  return s;
};
