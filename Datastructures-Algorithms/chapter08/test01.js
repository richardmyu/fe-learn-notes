/*
* BST 二叉搜索树
*   和链表一样，使用指针来表示节点之间的关系（术语为：边）
*   键，是树相关的术语中对于节点的称呼
* BST特点:
*  左侧存储比父节点小的数据，
*  右侧存储大于或等于父节点的数据
*/
function BinarySearchTree() {
  let Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };
  let root = null;

  this.getRoot = function () {
    return root;
  };

  this.insert = function (key) {
    let newNode = new Node(key);
    // 空
    if (root === null) {
      root = newNode;
    } else {
      // 非空，调用insertNode
      insertNode(root, newNode);
    }
  };

  // 私有辅助函数：将节点添加到非根结点位置
  let insertNode = function (node, newNode) {
    // node 父节点
    // newNode 新增子节点
    // 占位顺序：父节点 --》 左子节点 --》 右子节点
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  };

  /*
  **********************
   *      中序遍历      *
   ********************
   *左 ---》 中 ---》 右
   ********************
   */

  this.inOrderTraverse = function (callback) {
    // 回调函数用来定义对遍历到每个节点进行的操作(也叫访问者模式)
    inOrderTraverseNode(root, callback);
  };

  // 辅助函数
  let inOrderTraverseNode = function (node, callback) {
    // 根据传入节点是否是null，来决定是否继续执行递归
    if (node !== null) {
      // 如果父节点不是null
      // 左
      inOrderTraverseNode(node.left, callback);

      // 中
      callback(node.key);

      // 右
      inOrderTraverseNode(node.right, callback);
    }
  };

  /********************
   *      先序遍历      *
   ********************
   *中 ---》 左 ---》 右
   ******************** */

  this.preOrderTraverse = function (callback) {
    preOrderTraverseNode(root, callback);
  };

  let preOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      // 中
      callback(node.key);

      // 左
      preOrderTraverseNode(node.left, callback);

      // 右
      preOrderTraverseNode(node.right, callback);
    }
  };


  /********************
   *      后序遍历      *
   ********************
   *左 ---》 右 ---》 中
   ******************** */

  this.postOrderTraverse = function (callback) {
    postOrderTraverseNode(root, callback);
  };

  let postOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      postOrderTraverseNode(node.left, callback);
      postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  };

  /************
   *    min    *
   ************* */

  this.min = function () {
    return minNode(root);
  };

  // minNode 可以从任意节点查找 min
  let minNode = function (node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node.key;
    }
    return null;
  };

  /************
   *    max    *
   ************* */

  this.max = function () {
    return maxNode(root);
  };

  let maxNode = function (node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right;
      }
      return node.key;
    }
    return null;
  };

  /************
   *     n    *
   ************* */

  this.search = function (key) {
    return searchNode(root, key);
  };

  let searchNode = function (node, key) {
    if (node === null) {
      return false;
    }
    if (key < node.key) {
      return searchNode(node.left, key);
    } else if (key > node.key) {
      return searchNode(node.right, key);
    } else {
      return true;
    }
  };

  /***************
   *   remove    *
   *************** */

  this.remove = function (key) {
    root = removeNode(root, key);
  };

  let removeNode = function (node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = removeNode(node.right, key);
      return node;
    } else {

      // 第一种情况--一个叶节点
      if (node.left === null && node.right === null) {
        // 移除
        node = null;
        // 注意指针，返回 null 将父节点指针赋值为 null
        return node;
      }

      // 第二种情况--只有一个子节点
      if (node.left === null) {
        // 父节点直接执行子节点
        node = node.right;
        // 返回更新节点
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      let findMinNode = function (node) {
        while (node && node.left !== null) {
          node = node.left;
        }
        return node;
      };

      // 第三种情况--有两个子节点
      // 1.找到右侧树的最小节点
      let aux = findMinNode(node.right);
      // 2.用最小节点更新该节点
      node.key = aux.key;
      // 3.移除原最小节点
      node.right = removeNode(node.right, aux.key);
      // 4.返回更新后的引用
      return node;
    }
  };

};

let tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

console.log('***** in-order transverse *****');

// 定义callback
function printNode(value) {
  console.log(value);
}

tree.inOrderTraverse(printNode);
// 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25

console.log('***** pre-order transverse *****');
tree.preOrderTraverse(printNode);

console.log('***** post-order transverse *****');
tree.postOrderTraverse(printNode);

console.log('***** max and min *****');
console.log(tree.max());
console.log(tree.min());
console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.');
console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.');

console.log('***** remove 6 *****');
tree.remove(6);
tree.inOrderTraverse(printNode);

console.log('***** remove 5 *****');
tree.remove(5);
tree.inOrderTraverse(printNode);

console.log('********* remove 15 ***********');
tree.remove(15);
tree.inOrderTraverse(printNode);

console.log('********* raw data structure ***********');
console.log(tree.getRoot());
