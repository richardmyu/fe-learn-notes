//RedBlackTree
/*
红黑树是一种近似平衡的二叉查找树，它能够确保任何一个节点的左右子树的高度差不会超过二者中较低那个的一陪。具体来说，红黑树是满足如下条件的二叉查找树（binary search tree）：

1.每个节点要么是红色，要么是黑色。
2.根节点必须是黑色
3.红色节点不能连续（也即是，红色节点的孩子和父亲都不能是红色）。
4.对于每个节点，从该点至null（树尾端）的任何路径，都含有相同个数的黑色节点。
*/
/*
*
* 红黑树的约束条件可能被破坏，需要通过调整使得查找树重新满足红黑树的约束条件。调整可以分为两类：
* 一类是颜色调整，即改变某个节点的颜色；
* 另一类是结构调整，集改变检索树的结构关系。结构调整过程包含两个基本操作：左旋（Rotate Left），右旋（RotateRight）。
* */

function RedBlackTree() {
  let Colors = {
    RED: 0,
    BLACK: 1
  };

  let Node = function (key, color) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.color = color;
    this.flipColor = function () {
      if (this.color === Colors.RED) {
        this.color = Colors.BLACK;
      } else {
        this.color = Colors.RED;
      }
    };
  };

  let root = null;

  this.getRoot = function () {
    return root;
  };

  let isRed = function (node) {
    if (!node) {
      return false;
    }
    return node.color === Colors.RED;
  };

  let flipColors = function (node) {
    node.left.flipColor();
    node.right.flipColor();
  };

  let rotateLeft = function (node) {
    let temp = node.right;
    if (temp !== null) {
      node.right = temp.left;
      temp.left = node;
      temp.color = node.color;
      node.color = Colors.RED;
    }
    return temp;
  };

  let rotateRight = function (node) {
    let temp = node.left;
    if (temp !== null) {
      node.left = temp.right;
      temp.right = node;
      temp.color = node.color;
      node.color = Colors.RED;
    }
    return temp;
  };

  let insertNode = function (node, ele) {
    if (node === null) {
      return new Node(ele, Colors.RED);
    }

    let newRoot = node;
    if (ele < node.key) {
      node.left = insertNode(node.left, ele);
    } else if (ele > node.key) {
      node.right = insertNode(node.right, ele);
    } else {
      node.key = ele;
    }

    if (isRed(node.right) && !isRed(node.left)) {
      newRoot = rotateLeft(node);
    }

    if (isRed(node.left) && isRed(node.left.left)) {
      newRoot = rotateRight(node);
    }

    if (isRed(node.left) && isRed(node.right)) {
      flipColors(node);
    }

    return newRoot;
  };

  this.insert = function (ele) {
    root = insertNode(root, ele);
    root.color = Colors.BLACK;
  };

  this.inOrderTraverse = function (callback) {
    inOrderTraverseNode(root, callback);
  };

  let inOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      inOrderTraverseNode(node.left, callback);
      callback(node.key);
      inOrderTraverseNode(node.right, callback);
    }
  };

  this.preOrderTraverse = function (callback) {
    preOrderTraverseNode(root, callback);
  };

  let preOrderTraverseNode = function (node, callback) {
    if (node !== null) {
      callback(node.key);
      preOrderTraverseNode(node.left, callback);
      preOrderTraverseNode(node.right, callback);
    }
  };

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
};

/*function RedBlackTree() {

  var Colors = {
    RED: 0,
    BLACK: 1
  };

  var Node = function (key, color) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.color = color;

    this.flipColor = function () {
      if (this.color === Colors.RED) {
        this.color = Colors.BLACK;
      } else {
        this.color = Colors.RED;
      }
    };
  };

  var root = null;

  this.getRoot = function () {
    return root;
  };

  var isRed = function (node) {
    if (!node) {
      return false;
    }
    return node.color === Colors.RED;
  };

  var flipColors = function (node) {
    node.left.flipColor();
    node.right.flipColor();
  };

  var rotateLeft = function (node) {
    var temp = node.right;
    if (temp !== null) {
      node.right = temp.left;
      temp.left = node;
      temp.color = node.color;
      node.color = Colors.RED;
    }
    return temp;
  };

  var rotateRight = function (node) {
    var temp = node.left;
    if (temp !== null) {
      node.left = temp.right;
      temp.right = node;
      temp.color = node.color;
      node.color = Colors.RED;
    }
    return temp;
  };

  var insertNode = function (node, element) {

    if (node === null) {
      return new Node(element, Colors.RED);
    }

    var newRoot = node;

    if (element < node.key) {

      node.left = insertNode(node.left, element);

    } else if (element > node.key) {

      node.right = insertNode(node.right, element);

    } else {
      node.key = element;
    }

    if (isRed(node.right) && !isRed(node.left)) {
      newRoot = rotateLeft(node);
    }

    if (isRed(node.left) && isRed(node.left.left)) {
      newRoot = rotateRight(node);
    }
    if (isRed(node.left) && isRed(node.right)) {
      flipColors(node);
    }

    return newRoot;
  };

  this.insert = function (element) {
    root = insertNode(root, element);
    root.color = Colors.BLACK;
  };
};*/

let rbTree = new RedBlackTree();

rbTree.insert(1);
rbTree.insert(2);
rbTree.insert(3);
rbTree.insert(4);
rbTree.insert(5);
rbTree.insert(6);
rbTree.insert(7);
rbTree.insert(14);
rbTree.insert(15);
rbTree.insert(13);
rbTree.insert(12);
rbTree.insert(11);

/*function printNode(value) {
  console.log(value);
}

console.log('***** in-order transverse *****');
rbTree.inOrderTraverse(printNode);

console.log('***** pre-order transverse *****');
rbTree.preOrderTraverse(printNode);

console.log('***** post-order transverse *****');
rbTree.postOrderTraverse(printNode);*/

console.log('********* raw data structure ***********');
console.log(rbTree.getRoot());

/*
*    2
*
* 1     4
*
*     3    6
*
*        5     14
*
*           11    15
*
*         7   12
*
*               13
* */

