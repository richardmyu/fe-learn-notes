/**
 * 基于 index.js，为了添加动画效果，需要改写视图更新部分，
 * 现在看来，原有视图更新逻辑不对，
 * 因为改变视图的仅有 push, pop, clear 三个操作，
 * 还有四个操作仅仅只是展示，
 * 所以视图更新逻辑应该拆分到这三个方法中
 */
const animateBox = document.getElementsByClassName('animate')[0];
const syntxBox = document.getElementsByClassName('syntx_content')[0];
const btns = document.getElementsByClassName('btns')[0];

// 全局创建 style，作为动画容器，
// 每次创建动画，更新 style 内容即可
const style = document.createElement("style");
style.textContent = '';
document.getElementsByTagName("head")[0].appendChild(style);

/**********************************
 *         动画，样式              *
 **********************************/

// 创建 动画单元 和 语法单元 元素
const createEle = function () {
  let num = Math.floor(Math.random() * 10);
  const animateItem = document.createElement('li');
  animateItem.className = 'animate_item';
  animateItem.innerText = '' + num;

  const syntxItem = document.createElement('code');
  syntxItem.innerText = 'stack.push(' + num + ')';

  activatedAnima(animateItem, syntxItem);

  return [animateItem, syntxItem];
}

const activatedAnima = function (animateItem, syntxItem) {
  // aniamte-item 进入动画
  animateItem.style.animation = 'anima-in 2s ease-out';
  let aniKeyframes = `@keyframes ${'anima-in'}{
    from { transform: translate(0, -${360 - animateStack.size() * 40}px); }
    to { transform: translate(0, 0); } }`;

  // syntx-item 进入动画
  syntxItem.style.animation = 'syntx-show 2s ease-out';
  let asybKeyframes = `@keyframes ${'syntx-show'}{
    from { opacity: 0; }
    to { opacity: 1; } }`;

  style.textContent = aniKeyframes + asybKeyframes;
}

const unactivetedAnima = function (animateItem, syntxItem) {
  // aniamte-item 离开动画
  animateItem.style.animation = 'anima-out 2s ease-in';
  let aniKeyframes = `@keyframes ${'anima-out'}{
    from { transform: translate(0, 0); }
    to { transform: translate(0, -${360 - animateStack.size() * 40}px); } }`;

  // syntx-item 离开动画
  syntxItem.style.animation = 'syntx-hidden 2s ease-in';
  let asybKeyframes = `@keyframes ${'syntx-hidden'}{
    from { opacity: 1; }
    to { opacity: 0; } }`;

  style.textContent = aniKeyframes + asybKeyframes;
}


/**********************************
 *           事件                 *
 **********************************/
const Stack = function () {
  let items = [];

  this.push = function (ele) {
    items.push(ele);
  };

  this.pop = function () {
    return items.pop();
  };

  this.peek = function () {
    return items[items.length - 1] ? items[items.length - 1].innerText : null;
  };

  this.isEmpty = function () {
    return items.length === 0;
  };

  this.size = function () {
    return items.length;
  };

  this.clear = function () {
    items = [];
  };

  this.print = function () {
    let s = '';
    items.forEach(item => s += item.innerText + '\n');
    alert(s || null);
  };
}


let animateStack = new Stack();
let syntxStack = new Stack();

const eventPush = function () {
  console.log('-- push --');
  let size = animateStack.size();
  if (size > 7) {
    alert('栈已满, 若要继续添加, 请先清空栈');
    return;
  }

  let [ani, syn] = createEle();
  animateStack.push(ani);
  syntxStack.push(syn);

  // 视图更新
  animateBox.appendChild(ani);
  syntxBox.appendChild(syn)
}

const eventPop = function () {
  console.log('-- pop --');
  let size = animateStack.size();
  if (size === 0) {
    alert('栈内没有元素');
    return;
  }

  let animateItem = animateStack.pop();
  let syntxItem = syntxStack.pop();

  // 先处理动画
  unactivetedAnima(animateItem, syntxItem);

  let timer = setTimeout(() => {
    // 再视图更新
    animateBox.removeChild(animateItem);
    syntxBox.removeChild(syntxItem);
    clearTimeout(timer);
  }, 2000);
}

const eventPeek = function () {
  console.log('-- peek --');
  alert(animateStack.peek() || null);
}

const eventIsEmpty = function () {
  console.log('-- isEmpty --');
  alert(animateStack.isEmpty());
}

const eventSize = function () {
  console.log('-- size --');
  alert(animateStack.size());
}

const eventClear = function () {
  console.log('-- clear --');
  animateStack.clear();
  syntxStack.clear();

  let oldAnimateList = animateBox.children;
  [...oldAnimateList].forEach(item => animateBox.removeChild(item));

  let oldSyntxList = syntxBox.children;
  [...oldSyntxList].forEach(item => syntxBox.removeChild(item));
}

const eventPrint = function () {
  console.log('-- print --');
  animateStack.print();
}

const eventObj = {
  'push': eventPush,
  'pop': eventPop,
  'peek': eventPeek,
  'isEmpty': eventIsEmpty,
  'size': eventSize,
  'clear': eventClear,
  'print': eventPrint,
  'list': ['push', 'pop', 'peek', 'isEmpty', 'size', 'clear', 'print'],
  'has': function (s) {
    return eventObj.list.includes(s);
  }
}

btns.addEventListener('click', (e) => {
  if (eventObj.has(e.target.className)) {
    eventObj[e.target.className]();
  }
})
