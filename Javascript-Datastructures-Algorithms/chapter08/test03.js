function AVLTree() {
  let Node = function (key) {
    this.key = key;
    this.left = null;
    this.right = null;
  };

  let root = null;

  this.getRoot = function () {
    return root;
  };

  let heightNode = function (node) {
    if (node === null) {
      return -1;
    } else {
      return Math.max(heightNode(node.left), heightNode(node.right)) + 1;
    }
  };

  let rotationLL = function (node) {
    let tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  };

  let rotationRR = function (node) {
    let tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  };

  let rotationLR = function (node) {
    node.left = rotationRR(node.left);
    return rotationLL(node);
  };

  let rotationRL = function (node) {
    node.right = rotationLL(node.right);
    return rotationRR(node);
  };

  let insertNode = function (node, ele) {
    if (node === null) {
      node = new Node(ele);
    } else if (ele < node.key) {
      node.left = insertNode(node.left, ele);
      if (node.left !== null) {
        if ((heightNode(node.left) - heightNode(node.right)) > 1) {
          if (ele < node.left.key) {
            node = rotationLL(node);
          } else {
            node = rotationLR(node);
          }
        }
      }
    } else if (ele > node.key) {
      node.right = insertNode(node.right, ele);
      if (node.right !== null) {
        if ((heightNode(node.right) - heightNode(node.left)) > 1) {
          if (ele > node.right.key) {
            node = rotationRR(node);
          } else {
            node = rotationRL(node);
          }
        }
      }
    }
    return node;
  };

  this.insert = function (ele) {
    root = insertNode(root, ele);
  };

  let parentNode;
  let nodeToBeDeleted;

  let removeNode = function (node, ele) {
    if (node === null) {
      return null;
    }
    parentNode = node;
    if (ele < node.key) {
      node.left = removeNode(node.left, ele);
    } else {
      nodeToBeDeleted = node;
      node.right = removeNode(node.right, ele);
    }

    if (node === parentNode) {
      if (nodeToBeDeleted !== null && ele === nodeToBeDeleted.key) {
        if (nodeToBeDeleted === parentNode) {
          node = node.left;
        } else {
          let tmp = nodeToBeDeleted.key;
          nodeToBeDeleted.key = parentNode.key;
          parentNode.key = tmp;
          node = node.right;
        }
      }
    } else {
      if (node.left === undefined) {
        node.left = null;
      }
      if (node.right === undefined) {
        node.right = null;
      }
      if ((heightNode(node.left) - heightNode(node.right)) === 2) {
        if (ele < node.left.key) {
          node = rotationLR(node);
        } else {
          node = rotationLL(node);
        }
      }
      if ((heightNode(node.right) - heightNode(node.left)) === 2) {
        if (ele > node.right.key) {
          node = rotationRL(node);
        } else {
          node = rotationRR(node);
        }
      }
    }
    return node;
  };

  this.remove = function (ele) {
    parentNode = null;
    nodeToBeDeleted = null;
    root = removeNode(root, ele);
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
};


var avlTree = new AVLTree();

function printNode(value) {
  console.log(value);
}

/*avlTree.insert(1);
avlTree.insert(2);
avlTree.insert(3);
avlTree.insert(4);
avlTree.insert(5);
avlTree.insert(6);
avlTree.insert(7);
avlTree.insert(14);
avlTree.insert(15);
avlTree.insert(13);
avlTree.insert(12);
avlTree.insert(11);*/


//RR rotation
avlTree.insert(50);
avlTree.insert(30);
avlTree.insert(70);
avlTree.insert(60);
avlTree.insert(80);
avlTree.insert(90);

//LL rotation
/*avlTree.insert(50);
avlTree.insert(30);
avlTree.insert(70);
avlTree.insert(10);
avlTree.insert(40);
avlTree.insert(5);*/

//LR rotation
/*avlTree.insert(50);
avlTree.insert(30);
avlTree.insert(70);
avlTree.insert(40);
avlTree.insert(10);
avlTree.insert(35);*/

//RL rotation
/*avlTree.insert(70);
avlTree.insert(50);
avlTree.insert(80);
avlTree.insert(72);
avlTree.insert(90);
avlTree.insert(75);*/


/*avlTree.remove(12);
avlTree.remove(15);
avlTree.remove(11);
avlTree.remove(14);
avlTree.remove(13);
avlTree.remove(7);
avlTree.remove(6);
avlTree.remove(2);
avlTree.remove(4);*/

console.log('***** in-order transverse *****');
avlTree.inOrderTraverse(printNode);
console.log('***** pre-order transverse *****');
avlTree.preOrderTraverse(printNode);
