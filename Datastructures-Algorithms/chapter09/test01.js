function Dictionary() {
  let items = {};
  this.has = function (key) {
    return items.hasOwnProperty(key);
  };
  this.set = function (key, value) {
    items[key] = value;
  };
  this.delete = function (key) {
    if (this.has(key)) {
      delete items[key];
      return true;
    }
    return false;
  };
  this.get = function (key) {
    return this.has(key) ? items[key] : undefined;
  };
  this.values = function (key) {
    let values = [];
    for (let k in items) {
      if (this.has(k)) {
        values.push(items[k]);
      }
    }
    return values;
  };
  this.keys = function () {
    return Object.keys(items);
  };
  this.clear = function () {
    items = {};
  };
  this.size = function () {
    return Object.keys(items).length;
  };
  this.each = function (fn) {
    for (let k in items) {
      if (this.has(k)) {
        fn(k, items[k]);
      }
    }
  };
  this.getItems = function () {
    return items;
  };
};

const items = new WeakMap();

class Stack {
  constructor() {
    items.set(this, []);
  }

  push(ele) {
    let s = items.get(this);
    s.push(ele);
  }

  pop() {
    let s = items.get(this);
    let r = s.pop();
    return r;
  }

  peek() {
    let s = items.get(this);
    return s[s.length - 1];
  }

  isEmpty() {
    let s = items.get(this);
    return s.length === 0;
  }

  size() {
    let s = items.get(this);
    return s.length;
  }

  clear() {
    items.set(this, []);
  }

  print() {
    console.log(this.toString());
  }

  toString() {
    let s = items.get(this);
    return s.toString();
  }
};

let Queue = (function () {
  const items = new WeakMap();

  class Queue {
    constructor() {
      items.set(this, []);
    }

    enqueue(ele) {
      let q = items.get(this);
      q.push(ele);
    }

    dequeue() {
      let q = items.get(this);
      return q.shift();
    }

    front() {
      let q = items.get(this);
      return q[0];
    }

    isEmpty() {
      let q = items.get(this);
      return q.length === 0;
    }

    clear() {
      items.set(this, []);
    }

    size() {
      let q = items.get(this);
      return q.length;
    }

    print() {
      let q = items.get(this);
      console.log(q.toString());
    }
  }

  return Queue;
})();

function Graph() {
  // 顶点
  let vertices = [];
  // 邻接表
  let adjList = new Dictionary();

  // 添加顶点
  this.addVertex = function (v) {
    vertices.push(v);
    adjList.set(v, []);
  };

  //
  this.addEdge = function (v, w) {
    // 有向图
    adjList.get(v).push(w);
    // 无向图
    adjList.get(w).push(v);
  };

  this.toString = function () {
    let str = '';
    for (let i = 0; i < vertices.length; i++) {
      str += vertices[i] + ' -> ';
      let neighbors = adjList.get(vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        str += neighbors[j] + ' ';
      }
      str += '\n';
    }
    return str;
  };

  /*
  * BFS
  * 广度优先搜索算法会从指定的第一个顶点开始遍历图，
  * 先访问其所有的相邻点，就像一次访问图的一层；
  *
  * */

  // 初始化标记--white
  let initializeColor = function () {
    let color = [];
    for (let i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white';
    }
    return color;
  };

  // BFS
  this.bfs = function (v, callback) {
    let color = initializeColor();
    // 存储待访问和待探索点
    queue = new Queue();
    // 起点
    queue.enqueue(v);

    while (!queue.isEmpty()) {
      // 移除一个顶点，获取其邻接表
      let u = queue.dequeue();
      neighbors = adjList.get(u);

      // 访问但未探索
      color[u] = 'grey';

      // 操作每一个子节点
      for (let i = 0; i < neighbors.length; i++) {
        // 当前子节点
        let w = neighbors[i];
        if (color[w] === 'white') {
          // 若子节点还有子节点，将该子节点标记为已访问为探索
          color[w] = 'grey';

          // 并加入队列
          queue.enqueue(w);
        }
      }

      // 将该顶点标记为已探索
      color[u] = 'black';

      // 若有回调函数，则执行
      if (callback) {
        callback(u);
      }
    }
  };

  // 使用 BFS 寻找最短路径
  this.BFS = function (v) {
    let color = initializeColor();
    let queue = new Queue();

    // 距离
    let d = [];

    // 前溯点
    let pred = [];
    queue.enqueue(v);

    for (let i = 0; i < vertices.length; i++) {
      d[vertices[i]] = 0;
      pred[vertices[i]] = null;
    }

    while (!queue.isEmpty()) {
      let u = queue.dequeue();
      let neighbors = adjList.get(u);
      color[u] = 'grey';
      for (let i = 0; i < neighbors.length; i++
      ) {
        let w = neighbors[i];
        if (color[w] === 'white') {
          color[w] = 'grey';
          d[w] = d[u] + 1;
          pred[w] = u;
          queue.enqueue(w);
        }
      }
      color[u] = 'black';
    }

    return {
      dist: d,
      pred: pred
    }
  };

  /*
  * DFS
  * 深度优先搜索算法会从指定的第一个顶点开始遍历图，
  * 沿着路径直到这条路径的最后一个顶点被访问，接着原路退回并探索下一条路径
  *
  * */
  this.dfs = function (callback) {
    let color = initializeColor();
    for (let i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        dfsVisit(vertices[i], color, callback);
      }
    }
  };

  let dfsVisit = function (u, color, callback) {
    color[u] = 'grey';
    if (callback) {
      callback(u);
    }

    let neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i];
      if (color[w] === 'white') {
        dfsVisit(w, color, callback);
      }
    }
    color[u] = 'black';
  };


  let time = 0;
  this.DFS = function () {
    let color = initializeColor();
    let d = [];
    let f = [];
    let p = [];
    time = 0;

    for (let i = 0; i < vertices.length; i++) {
      f[vertices[i]] = 0;
      d[vertices[i]] = 0;
      p[vertices[i]] = null;
    }

    for (let i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        DFSVisit(vertices[i], color, d, f, p);
      }
    }

    return {
      dist: d,
      fini: f,
      pred: p
    };
  };

  let DFSVisit = function (u, color, d, f, p) {
    console.log('disc ' + u);
    color[u] = 'grey';
    d[u] = ++time;
    let neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i];
      if (color[w] === 'white') {
        p[w] = u;
        DFSVisit(w, color, d, f, p);
      }
    }
    color[u] = 'black';
    f[u] = ++time;
    console.log('expl ' + u);
  }

};

let graph = new Graph();
let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
// console.log(graph.toString());

console.log('/********* -- bfs -- *********/');

function printNode(value) {
  console.log('Visited vertex: ' + value);
};
// graph.bfs(myVertices[0], printNode);

console.log('/********* -- BFS -- *********/');
let shortPathA = graph.BFS(myVertices[0]);
console.log(shortPathA.dist);
console.log(shortPathA.pred);

let fromVertex = myVertices[0];
for (let i = 0; i < myVertices.length; i++) {
  let toVertex = myVertices[i];
  let path = new Stack();
  for (let v = toVertex; v !== fromVertex; v = shortPathA.pred[v]) {
    path.push(v);
  }
  path.push(fromVertex);
  let str = path.pop();
  while (!path.isEmpty()) {
    str += ' - ' + path.pop();
  }
  console.log(str);
}

graph.dfs(printNode);
graph.DFS();

// 拓扑排序
let graphTopsort = new Graph();
myV = ['A', 'B', 'C', 'D', 'E', 'F'];
for (let i = 0; i < myV.length; i++) {
  graphTopsort.addVertex(myV[i]);
}
graphTopsort.addEdge('A', 'C');
graphTopsort.addEdge('A', 'D');
graphTopsort.addEdge('B', 'D');
graphTopsort.addEdge('B', 'E');
graphTopsort.addEdge('C', 'F');
graphTopsort.addEdge('F', 'E');
let result = graphTopsort.DFS();
console.log(result);
