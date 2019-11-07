const assert = require('assert').strict
const _ = require('lodash')
const tool = require('../util/index')

/*
	_.compact(array)
	  - 创建一个新数组，包含原数组中所有的非假值元素。例如false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”。

	参数
	  - array (Array): 待处理的数组

	返回值
	  - (Array): 返回过滤掉假值的新数组。

	例子
		_.compact([0, 1, false, 2, '', 3]);
		// => [1, 2, 3]
*/
const _compact = ary => {
  let leng = ary == null ? 0 : tool.isArray(ary) ? ary.length : 0
  let newAry = []
  for (let i = 0; i < leng; i++) {
    if (ary[i]) {
      newAry.push(ary[i])
    }
  }
  return newAry
}
let ary = [1, false, 'false', null, NaN, undefined]
console.log(_.compact(), _compact())
assert.deepStrictEqual(_.compact(), _compact())

console.log(_.compact([]), _compact([]))
assert.deepStrictEqual(_.compact([]), _compact([]))

console.log(_.compact({}), _compact({}))
assert.deepStrictEqual(_.compact({}), _compact({}))

console.log(_.compact(1), _compact(2))
assert.deepStrictEqual(_.compact(1), _compact(2))

console.log(_.compact(ary), _compact(ary))
assert.deepStrictEqual(_.compact(ary), _compact(ary))
