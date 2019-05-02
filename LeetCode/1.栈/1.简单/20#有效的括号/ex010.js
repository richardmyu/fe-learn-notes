// 执行用时为 92 ms 的范例  12.85
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const left = ['(', '{', '[']
  const right = [')', '}', ']']
  const m = new Map([
    ['(', ')'],
    ['{', '}'],
    ['[', ']'],
  ])

  const stack = []
  for (let i = 0; i < s.length; i++) {
    if (left.includes(s[i])) {
      stack.push(s[i])
    } else if (right.includes(s[i])) {
      const last = stack.pop()
      if (m.get(last) !== s[i]) {
        return false
      }
    }
  }


  return stack.length === 0
};