//Dijkstra 是一种计算单个源到所有其他源的最短路径的贪心算法

//Floyd-Warshall 是一种计算图中所有最短路径的动态规划算法

function ShortestPath(graph) {

  this.graph = graph;

  var INF = Number.MAX_SAFE_INTEGER;

  var minDistance = function(dist, visited){

    var min = INF,
      minIndex = -1;

    for (var v = 0; v < dist.length; v++){
      if (visited[v] == false && dist[v] <= min){
        min = dist[v];
        minIndex = v;
      }
    }

    return minIndex;
  };

  this.dijkstra = function(src){

    var dist = [],
      visited = [],
      length = this.graph.length;

    //初始化距离
    for (var i = 0; i < length; i++) {
      dist[i] = INF;
      visited[i] = false;
    }
    //
    dist[src] = 0;

    for (var i = 0; i < length-1; i++){

      var u = minDistance(dist, visited);
      visited[u] = true;

      for (var v = 0; v < length; v++){
        if (!visited[v] && this.graph[u][v]!=0 && dist[u] != INF && dist[u]+this.graph[u][v] < dist[v]){
          dist[v] = dist[u] + this.graph[u][v];
        }
      }
    }

    return dist;
  };

  this.floydWarshall = function(){

    var dist = [],
      length = this.graph.length,
      i, j, k;

    for (i = 0; i < length; i++){
      dist[i] = [];
      for (j = 0; j < length; j++){
        dist[i][j] = this.graph[i][j];
      }
    }

    for (k = 0; k < length; k++){
      for (i = 0; i < length; i++){
        for (j = 0; j < length; j++){
          if (dist[i][k] + dist[k][j] < dist[i][j]){
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }

    return dist;
  }
};


let i;

let graph = [[0, 2, 4, 0, 0, 0],
  [0, 0, 2, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]];

let shortestPath = new ShortestPath(graph);

console.log("********* Dijkstra's Algorithm - Shortest Path ***********");


let dist = shortestPath.dijkstra(0);

for (i = 0; i < dist.length; i++){
  console.log(i + '\t\t' + dist[i]);
}

console.log("********* Floyd-Warshall Algorithm - All-Pairs Shortest Path ***********");

let INF = Number.MAX_SAFE_INTEGER;
graph = [[0, 2, 4, INF, INF, INF],
  [INF, 0, 2, 4, 2, INF],
  [INF, INF, 0, INF, 3, INF],
  [INF, INF, INF, 0, INF, 2],
  [INF, INF, INF, 3, 0, 2],
  [INF, INF, INF, INF, INF, 0]];

shortestPath = new ShortestPath(graph);

dist = shortestPath.floydWarshall();

let s = '';
for (i=0; i<dist.length; ++i) {
  s = '';
  for (var j=0; j<dist.length; ++j) {
    if (dist[i][j] === INF)
      s += "INF ";
    else
      s += dist[i][j]+"   ";
  }
  console.log(s);
}
