/*
_.takeWhile(array, [predicate=_.identity])
从array数组的起始元素开始提取元素，，直到 predicate 返回假值。predicate 会传入三个参数： (value, index, array)。

参数
array (Array): 需要处理的数组
[predicate=_.identity] (Array|Function|Object|string): 每次迭代调用的函数。

返回
(Array): 返回 array 数组的切片。

例子
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false},
  { 'user': 'pebbles', 'active': true }
];

_.takeWhile(users, function(o) { return !o.active; });
// => objects for ['barney', 'fred']

// The `_.matches` iteratee shorthand.
_.takeWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['barney']

// The `_.matchesProperty` iteratee shorthand.
_.takeWhile(users, ['active', false]);
// => objects for ['barney', 'fred']

// The `_.property` iteratee shorthand.
_.takeWhile(users, 'active');
// => []
*/
