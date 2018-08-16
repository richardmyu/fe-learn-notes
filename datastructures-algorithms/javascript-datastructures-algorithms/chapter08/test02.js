//自平衡数树 -- AVLTree
/*
* BST存在一个问题：取决于添加的节点数，可能树的一条边会非常深。这会在某条边上操作时引起一些性能问题。为了解决这个问题，引入Adelson-Velskii-Landi数(AVL树)，是一种自平衡二叉搜索树，即任何一个节点左右两侧子树的高度只差最多为1。也就是说这种树会在添加或移除节点时尽量试着成为一颗完全树。
* */

/******************
 *   插入节点
 ******************* */

//在AVL树中插入或移除节点和BST完全相同，只是AVL树要检验“平衡因子”

let insertNode = function (node, ele) {
  if (node === null) {
    node = new Node(ele);
  } else if (ele < node.key) {
    node.left = insertNode(node.left, ele);
    if (node.left !== null) {
      //确认是否需要平衡
    }
  } else if (ele > node.key) {
    node.right = insertNode(node.right, ele);
    if (node.right !== null) {
      //确认是否需要平衡
    }
  }
  return node;
};


/******************
 *  计算平衡因子
 ******************* */
//在AVL树中，需要对每个节点计算右子树高度(hr)和左子树的高度(hl)的差值，该值（hr-hl）应为0/1或-1，否则需要平衡树

let heightNode = function (node) {
  if (node === null) {
    return -1;
  } else {
    return Math.max(heightNode(node.left), heightNode(node.right)) + 1;
  }

  //因此向左子树插入新节点时，需要重新计算其高度；
  //如果高度超出范围，需要平衡子树
  if ((heightNode(node.left) - heightNode(node.right)) > 1) {
    //旋转
  }

  //向右子树插入新节点
  if ((heightNode(node.right) - heightNode(node.left)) > 1) {
    //旋转
  }
};


/********************************************
 *   AVL旋转 -- 右-右（RR）：向左的单旋转
 ******************************************** */

/*
*     50                            70
*
* 30      70                   50        80
*                    ==>
*      60     80           30      60       90
*
*                +90
* */

let rotationRR = function (node) {
  //重置根结点
  let tmp = node.right;
  //将原跟节点的右子树变为新根结点的左子树
  node.right = tmp.left;
  //将新根结点的原左子树变为左节点
  tmp.left = node;
  return tmp;
};

/********************************************
 *   AVL旋转 -- 左-左（LL）：向右的单旋转
 ******************************************** */

/*
*           50                   30
*
*       30      70           10       50
*                    ==>
*    10     60            5        60     70
*
* +5
* */

let rotationLL = function (node) {
  let tmp = node.left;
  node.left = tmp.right;
  tmp.right = node;
  return tmp;
};


/********************************************
 *   AVL旋转 -- 左-右（LR）：向右的双旋转
 ******************************************** */

/*
*         50                 40
*
*     30      70          30      50
*                 ==>
* 10     40            10    35       70
*
*      +35
*
*   根结点的选择：1.大体是中位数；2.尽可能移动少的元素
* */

let rotationLR = function (node) {
  node.left = rotationRR(node.left);
  return rotationLL(node);
};

/********************************************
 *   AVL旋转 -- 右-左（RL）：向左的双旋转
 ******************************************** */

/*
*    70                   72
*
* 50    80             70    80
*              ==>
*     72   90        50    75   90
*
*       +75
* */

let rotationRL = function (node) {
  node.right = rotationLL(node.right);
  return rotationRR(node);
};

/******************
 *   insertNode
 ******************* */

//左树平衡
if ((heightNode(node.left) - heightNode(node.right)) > 1) {
  if (ele < node.left.key) {
    node = rotationLL(node);
  } else {
    node = rotationLR(node);
  }
}

//右树平衡
if ((heightNode(node.left) - heightNode(node.right)) > 1) {
  if (ele < node.left.key) {
    node = rotationRR(node);
  } else {
    node = rotationRL(node);
  }
}