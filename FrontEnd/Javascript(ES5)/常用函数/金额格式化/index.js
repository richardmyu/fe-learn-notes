const assert = require('assert').strict
const { moneyString } = require('./hu')
const { normalizeMoney } = require('./yu')

assert.deepStrictEqual(moneyString(100), normalizeMoney(100))
// assert.deepStrictEqual(moneyString(100.1), normalizeMoney(100.1))
assert.deepStrictEqual(moneyString(10000), normalizeMoney(10000))
// assert.deepStrictEqual(moneyString(0.100), normalizeMoney(0.100))
assert.deepStrictEqual(moneyString(100.999), normalizeMoney(100.999))
assert.deepStrictEqual(moneyString(100.991), normalizeMoney(100.991))
