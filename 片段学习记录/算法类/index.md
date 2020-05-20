# 算法

### 1.实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置

> [source](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/119)

### 2.旋转数组算法题

给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

示例 1：

```shell
输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
输出: [5, 6, 7, 1, 2, 3, 4]
解释:
向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6]
向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]
```

示例 2：

```shell
输入: [-1, -100, 3, 99] 和 k = 2
输出: [3, 99, -1, -100]
解释:
向右旋转 1 步: [99, -1, -100, 3]
向右旋转 2 步: [3, 99, -1, -100]
```

> [source](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/126)

### 3.打印出 1 - 10000 之间的所有对称数 例如 121、1331 等

> [source](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/131)

### 4.移动零

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:

```shell
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
```

说明:

1. 必须在原数组上操作，不能拷贝额外的数组。
2. 尽量减少操作次数。

> [source](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/132)

### 5.两数之和

给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。

你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。

示例：

给定 `nums = [2, 7, 11, 15], target = 9`

因为 `nums[0] + nums[1] = 2 + 7 = 9`
所以返回 `[0, 1]`

> [source](https://github.com/Advanced-Frontend/Daily-Interview-Question/pull/136)

### 6.实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度

以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性 children 数组下，结构如下：

```js
// 原始 list 如下
let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];
const result = convert(list, ...);

// 转换后的结果如下
let result = [
    {
      id: 1,
      name: '部门A',
      parentId: 0,
      children: [
        {
          id: 3,
          name: '部门C',
          parentId: 1,
          children: [
            {
              id: 6,
              name: '部门F',
              parentId: 3
            }, {
              id: 16,
              name: '部门L',
              parentId: 3
            }
          ]
        },
        {
          id: 4,
          name: '部门D',
          parentId: 1,
          children: [
            {
              id: 8,
              name: '部门H',
              parentId: 4
            }
          ]
        }
      ]
    },
  ···
];
```

> [source](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/139)

### 7.已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

> [source](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/143)

### 8.中位数

第 93 题：给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log(m+n))。 #144

> [source](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/144)
