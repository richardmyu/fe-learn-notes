/**
 * 汉诺塔（hanoi）
 * 移动过程中，通过切换实参的位置，巧妙的实现了简单的 source->dest 移动包含了其他 5 移动方向的功能
 * 代码比较简练，但是理解起来就有点难受了
 */

const Stack = require('./stack');

/**
 *
 * @param {*} plates 圆盘数量
 * @param {*} source 起始柱栈
 * @param {*} helper 中间柱栈
 * @param {*} dest 目标柱栈
 * @param {*} sourceName 起始柱名称
 * @param {*} helperName 中间柱名称
 * @param {*} destName 目标柱名称
 * @param {*} moves 移动路径
 * @returns
 */
function towerOfHanoi(plates, source, helper, dest, sourceName, helperName, destName, moves = []) {

  if (plates <= 0) {
    return moves;
  }

  if (plates === 1) {
    dest.push(source.pop());
    const move = {};
    move[sourceName] = source.toString();
    move[helperName] = helper.toString();
    move[destName] = dest.toString();
    moves.push(move);

  } else {
    // 圆盘多余 1 个时，不能直接先移动圆盘到 目标柱，而是中间柱
    // 以 2 个盘为例子：
    // source: [2, 1] helper: [] dest: []
    // 第一步：source: [2] dest: [] helper: [1]
    // 第二步：source: [] dest: [2] helper: [1]
    // 第三步：sorce: [] helper: [] dest: [2, 1]
    // 移至中间柱缓冲
    towerOfHanoi(
      plates - 1,
      source,
      dest,
      helper,
      sourceName,
      destName,
      helperName,
      moves
    );

    // 移至目标柱
    dest.push(source.pop());
    const move = {};
    move[sourceName] = source.toString();
    move[helperName] = helper.toString();
    move[destName] = dest.toString();
    moves.push(move);

    // 将中间柱移回
    towerOfHanoi(
      plates - 1,
      helper,
      source,
      dest,
      helperName,
      sourceName,
      destName,
      moves
    );
  }
  return moves;
}

function hanoiStack(plates) {
  const source = new Stack();
  const dest = new Stack();
  const helper = new Stack();

  for (let i = plates; i > 0; i--) {
    source.push(i);
  }

  return towerOfHanoi(
    plates,
    source,
    helper,
    dest,
    'source',
    'helper',
    'dest'
  );
}

//用栈来实现汉诺塔
console.log(hanoiStack(1));
console.log(hanoiStack(2));
console.log(hanoiStack(3));
console.log(hanoiStack(5));
console.log(hanoiStack(7));
