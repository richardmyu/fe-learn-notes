// 执行用时为 92 ms 的范例
/**
 * @param {number[]} prices
 * @return {number}
 */

var maxProfit = function(prices) {
  let len = prices.length;
  if (len === 0) return 0;
  let ret = 0;
  for (let i = 1; i < len; i++) {
    let differ = prices[i] - prices[i - 1];
    if (differ > 0) ret += differ;
  }
  return ret;
};
