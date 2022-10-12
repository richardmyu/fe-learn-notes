/*
* 最小生成树   MST
*
* Prim & Kruskal 一种求解加权无向连通图的MST问题的贪心算法
**/

function MinimumSpanningTree(graph) {

  this.graph = graph;

  var INF = Number.MAX_SAFE_INTEGER;

  var minKey = function (key, visited) {
    // Initialize min value
    var min = INF, minIndex;

    for (var v = 0; v < this.graph.length; v++) {
      if (visited[v] == false && key[v] < min) {
        min = key[v];
        minIndex = v;
      }
    }

    return minIndex;
  };

  this.prim = function () {
    var parent = [],
      key = [],
      visited = [],
      length = this.graph.length,
      i;

    for (i = 0; i < length; i++) {
      key[i] = INF;
      visited[i] = false;
    }

    key[0] = 0;
    parent[0] = -1;

    for (i = 0; i < length - 1; i++) {
      var u = minKey(key, visited);
      visited[u] = true;

      for (var v = 0; v < length; v++) {
        if (this.graph[u][v] && visited[v] == false && this.graph[u][v] < key[v]) {
          parent[v] = u;
          key[v] = this.graph[u][v];
        }
      }
    }

    return parent;
  };

  var find = function (i, parent) {
    while (parent[i]) {
      i = parent[i];
    }
    return i;
  };

  var union = function (i, j, parent) {
    if (i != j) {
      parent[j] = i;
      return true;
    }
    return false;
  };

  var initializeCost = function () {
    var cost = [], length = this.graph.length;
    for (var i = 0; i < length; i++) {
      cost[i] = [];
      for (var j = 0; j < length; j++) {
        if (this.graph[i][j] == 0) {
          cost[i][j] = INF;
        } else {
          cost[i][j] = this.graph[i][j];
        }
      }
    }
    return cost;
  };

  this.kruskal = function () {

    var length = this.graph.length,
      parent = [], cost,
      ne = 0, a, b, u, v, i, j, min;

    cost = initializeCost();

    while (ne < length - 1) {

      for (i = 0, min = INF; i < length; i++) {
        for (j = 0; j < length; j++) {
          if (cost[i][j] < min) {
            min = cost[i][j];
            a = u = i;
            b = v = j;
          }
        }
      }

      u = find(u, parent);
      v = find(v, parent);

      if (union(u, v, parent)) {
        ne++;
      }

      cost[a][b] = cost[b][a] = INF;
    }

    return parent;
  }
};

var i;

var graph = [[0, 2, 4, 0, 0, 0],
[2, 0, 2, 4, 2, 0],
[4, 2, 0, 0, 3, 0],
[0, 4, 0, 0, 3, 2],
[0, 2, 3, 3, 0, 2],
[0, 0, 0, 2, 2, 0]];

var mst = new MinimumSpanningTree(graph);


console.log("********* Prim's Algorithm - Minimum Spanning Tree ***********");

var parent = mst.prim();

console.log('Edge   Weight');
for (i = 1; i < graph.length; i++) {
  console.log(parent[i] + ' - ' + i + '   ' + graph[i][parent[i]]);
}

console.log("********* Kruskal Algorithm - Minimum Spanning Tree ***********");

parent = mst.kruskal();

console.log('Edge   Weight');
for (i = 1; i < graph.length; i++) {
  console.log(parent[i] + ' - ' + i + '   ' + graph[i][parent[i]]);
}
