const assert = require('assert').strict
const _ = require('lodash')
const tool = require('../util/index')

/*
  _.chunk(array, [size=1])
    - 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组。 如果array 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。

  参数
    - array (Array): 需要处理的数组
    - [size=1] (number): 每个数组区块的长度

  返回
    - (Array): 返回一个包含拆分区块的新数组（相当于一个二维数组）。

  例子
    _.chunk(['a', 'b', 'c', 'd'], 2);
    // => [['a', 'b'], ['c', 'd']]

    _.chunk(['a', 'b', 'c', 'd'], 3);
    // => [['a', 'b', 'c'], ['d']]
*/

const _chunk = (ary, size = 1) => {
  let sizeInt = Number.parseInt(Number(size))
  let newAry = []
  if (typeof sizeInt === 'number' && !Number.isNaN(sizeInt) && sizeInt > 0) {
    let length = ary == null ? 0 : tool.isArray(ary) ? ary.length : 0
    let leng = Math.ceil(length / sizeInt)
    for (let i = 0; i < leng; i++) {
      newAry[i] = ary.slice(i * sizeInt, (i + 1) * sizeInt)
    }
  }
  return newAry
}

// test
let ary = [1, 2, 3, 4]
console.log(_.chunk(ary), _chunk(ary))
assert.deepStrictEqual(_.chunk(ary), _chunk(ary))

console.log(_.chunk([]), _chunk([]))
assert.deepStrictEqual(_.chunk([]), _chunk([]))

console.log(_.chunk(), _chunk())
assert.deepStrictEqual(_.chunk(), _chunk())

console.log(_.chunk(null), _chunk(null))
assert.deepStrictEqual(_.chunk(null), _chunk(null))

console.log(_.chunk(ary, 0), _chunk(ary, 0))
assert.deepStrictEqual(_.chunk(ary, 0), _chunk(ary, 0))

console.log(_.chunk(ary, 1), _chunk(ary, 1))
assert.deepStrictEqual(_.chunk(ary, 1), _chunk(ary, 1))

console.log(_.chunk(ary, -1), _chunk(ary, -1))
assert.deepStrictEqual(_.chunk(ary, -1), _chunk(ary, -1))

console.log(_.chunk(ary, 0.2), _chunk(ary, 0.2))
assert.deepStrictEqual(_.chunk(ary, 0.2), _chunk(ary, 0.2))

console.log(_.chunk(ary, 2), _chunk(ary, 2))
assert.deepStrictEqual(_.chunk(ary, 2), _chunk(ary, 2))

console.log(_.chunk(ary, 3), _chunk(ary, 3))
assert.deepStrictEqual(_.chunk(ary, 3), _chunk(ary, 3))

console.log(_.chunk(ary, 5), _chunk(ary, 5))
assert.deepStrictEqual(_.chunk(ary, 5), _chunk(ary, 5))

console.log(_.chunk(ary, '5'), _chunk(ary, '5'))
assert.deepStrictEqual(_.chunk(ary, '5'), _chunk(ary, '5'))

console.log(_.chunk(ary, '5x'), _chunk(ary, '5x'))
assert.deepStrictEqual(_.chunk(ary, '5x'), _chunk(ary, '5x'))
