// 执行用时为 84 ms 的范例  1.54
/**
 * @param {string} s
 * @return {boolean}
 */

const PAIRS = {
  ')': '(',
  ']': '[',
  '}': '{',
}

var isValid = function (s) {
  const arr = s.split('')
  const stack = []
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i]
    if (!PAIRS[el]) {
      stack.push(el)
    } else {
      const pair = stack.pop()
      if (pair !== PAIRS[el]) {
        return false
      }
    }
  }
  return stack.length === 0
};
