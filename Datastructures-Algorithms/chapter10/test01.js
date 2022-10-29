function ArrayList() {
  let ary = [];
  this.insert = function (item) {
    ary.push(item);
  };
  this.toString = function () {
    return ary.join();
  };
  let swap = function (ary, index1, index2) {
    [ary[index1], ary[index2]] = [ary[index2], ary[index1]];
  };

  /*********************************
   *             冒泡排序
   *
   * 比较任意相邻的项，
   * 如果第一项大于第二项则交换位置，
   * 较大的项依次沉到底部，
   * 而小的项逐渐冒出
  *********************************/
  this.bubbleSort = function () {
    let length = ary.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1; j++) {
        if (ary[j] > ary[j + 1]) {
          swap(ary, j, j + 1);
        }
      }
    }
  };

  this.modiBubbleSort = function () {
    let length = ary.length;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        if (ary[j] > ary[j + 1]) {
          swap(ary, j, j + 1);
        }
      }
    }
  }

  /*********************************
   *             选择排序
   *
   * 原址比较排序
   * 找到最小值放到第一位，
   * 接着寻找第二小值，
   * 以此类推
  *********************************/
  this.selectionSort = function () {
    let length = ary.length;
    let indexMin;
    for (let i = 0; i < length - 1; i++) {
      indexMin = i;
      for (let j = i + 1; j < length; j++) {
        if (ary[indexMin] > ary[j]) {
          indexMin = j;
        }
      }
      if (i !== indexMin) {
        swap(ary, i, indexMin);
      }
    }
  };

  /***************************************
   *             插入排序
   *
   * 指定某一项为参考项，
   * 依次比较该项之前的其他项与参考项的大小，
   * 从而决定其他项的插入的位置
   * 排序小型数组时，
   * 性能好于选择排序和冒泡排序
  ***************************************/
  this.insertionSort = function () {
    let length = ary.length;
    let j;
    let temp;
    for (let i = 1; i < length; i++) {
      j = i;
      temp = ary[i];
      while (j > 0 && ary[j - 1] > temp) {
        ary[j] = ary[j - 1];
        j--;
      }
      ary[j] = temp;
    }
  };

  /***************************************************
   *             归并排序
   *
   * 归并排序是第一个可以被实际使用的排序算法
   * 前三个性能不好，归并排序性能好，其复杂度为 O(nlogn)
   * 归并排序是一种分治算法。
   * 其思想是将原始数组切分成较小的数组，
   * 直到每一个小数组只有一个位置，
   * 接着将小数组归并为较大的数组，
   * 直到最后只有一个排序完毕的大数组
  ***************************************************/

  // 由于是分治，归并排序也是递归的
  this.mergeSort = function () {
    ary = mergeSortRec(ary);
  };

  // 分割数组直至一位数
  let mergeSortRec = function (ary) {
    let length = ary.length;
    if (length === 1) {
      // console.log(ary);
      return ary;
    }
    let mid = Math.floor(length / 2);
    let left = ary.slice(0, mid);
    let right = ary.slice(mid, length);
    return merge(mergeSortRec(left), mergeSortRec(right));
  };

  // 比较大小，合并小数组直至最后一个
  let merge = function (left, right) {
    let result = [];
    let il = 0;
    let ir = 0;
    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++]);
      } else {
        result.push(right[ir++]);
      }
    }

    // 归并剩余项
    while (il < left.length) {
      result.push(left[il++]);
    }
    while (ir < right.length) {
      result.push(right[ir++]);
    }

    return result;
  };

  /*********************************************
   *             快速排序
   *
   * 最常用的排序算法
   * 复杂度为O(nlogn)
   * 且它的性能通常比其他的同等复杂度的排序算法要好
   *
   * 也是采用分治的方法
   * 1.从数组中选取中间一项作为主元
   *
   * 2.创建两个指针，
   * 左边一个指向数组的第一项，
   * 右边的一个指向数组的最后一项；
   * 移动左指针直到找到比主元大的元素；
   * 再移动右指针直到找到比主元小的元素；
   * 交换
   * 重复以上，直到左指针超过右指针
   *
   * 3.算法对划分后的小组（
   * 较主元小的子数组和较主元大的子数组）
   * 重复之前的两步，
   * 直至数组完全排序
  **********************************************/
  this.quickSort = function () {
    quick(ary, 0, ary.length - 1);
  };

  // 划分操作
  let partition = function (ary, left, right) {
    // 选择主元 pivot
    let pivot = ary[Math.floor((right + left) / 2)];
    console.log('pivot ' + pivot + '; left ' + left + '; right ' + right);
    // 左、右指针
    let i = left;
    let j = right;
    while (i <= j) {
      while (ary[i] < pivot) {
        i++;
      }
      while (ary[j] > pivot) {
        j--;
      }
      if (i <= j) {
        swap(ary, i, j);
        i++;
        j--;
      }
    }
    return i;
  };

  let quick = function (ary, left, right) {
    let index;
    if (ary.length > 1) {
      console.log(ary);
      index = partition(ary, left, right);
      if (left < index - 1) {
        quick(ary, left, index - 1);
      }
      if (index < right) {
        quick(ary, index, right)
      }
    }
  };

  /********************************************
   *             堆排序
   *
   * 堆排序也是很高效的算法，
   * 因为其把数组当做二叉树来排序
   * 索引 0 是树的根结点
   * 除根结点外，任意节点 N 的父节点是 N/2
   * 节点 L 的左子节点是 2*L
   * 节点 R 的右子节点是 2*R+1
  *******************************************/
  this.heapSort = function () {
    let heapSize = ary.length;
    buildHeap(ary);
    while (heapSize > 1) {
      heapSize--;
      swap(ary, 0, heapSize);
      heapify(ary, heapSize, 0);
    }
  };

  let buildHeap = function (ary) {
    let heapSize = ary.length;
    for (let i = Math.floor(heapSize / 2); i >= 0; i--) {
      heapify(ary, heapSize, i);
    }
  };

  let heapify = function (ary, heapSize, i) {
    let left = i * 2 + 1;
    right = i * 2 + 2;
    largest = i;

    if (left < heapSize && ary[left] > ary[largest]) {
      largest = left;
    }

    if (right < heapSize && ary[right] > ary[largest]) {
      largest = right;
    }

    if (largest !== i) {
      swap(ary, i, largest);
      heapify(ary, heapSize, largest);
    }
  };

  /****************************************
   *             计数排序
   *
   ***************************************/

  this.countingSort = function () {

    var i,
      maxValue = this.findMaxValue(),
      sortedIndex = 0,
      counts = new Array(maxValue + 1);

    for (i = 0; i < ary.length; i++) {
      if (!counts[ary[i]]) {
        counts[ary[i]] = 0;
      }
      counts[ary[i]]++;
    }

    // console.log('Frequencies: ' + counts.join());

    for (i = 0; i < counts.length; i++) {
      while (counts[i] > 0) {
        ary[sortedIndex++] = i;
        counts[i]--;
      }
    }
  };

  /****************************************
   *             桶排序
   *
   ***************************************/

  this.bucketSort = function (bucketSize) {

    var i,
      minValue = this.findMinValue(),
      maxValue = this.findMaxValue(),
      BUCKET_SIZE = 5;

    console.log('minValue ' + minValue);
    console.log('maxValue ' + maxValue);

    bucketSize = bucketSize || BUCKET_SIZE;
    var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    var buckets = new Array(bucketCount);
    console.log('bucketSize = ' + bucketCount);
    for (i = 0; i < buckets.length; i++) {
      buckets[i] = [];
    }

    for (i = 0; i < ary.length; i++) {
      buckets[Math.floor((array[i] - minValue) / bucketSize)].push(ary[i]);
      console.log('pushing item ' + ary[i] + ' to bucket index ' + Math.floor((ary[i] - minValue) / bucketSize));
    }

    array = [];
    for (i = 0; i < buckets.length; i++) {
      insertionSort_(buckets[i]);

      console.log('bucket sorted ' + i + ': ' + buckets[i].join());

      for (var j = 0; j < buckets[i].length; j++) {
        array.push(buckets[i][j]);
      }
    }
  };

  /****************************************
   *             基数排序
   *
   ***************************************/

  this.radixSort = function (radixBase) {

    var i,
      minValue = this.findMinValue(),
      maxValue = this.findMaxValue(),
      radixBase = radixBase || 10;

    // Perform counting sort for each significant digit), starting at 1
    var significantDigit = 1;
    while (((maxValue - minValue) / significantDigit) >= 1) {
      console.log('radix sort for digit ' + significantDigit);
      ary = countingSortForRadix(array, radixBase, significantDigit, minValue);
      console.log(array.join());
      significantDigit *= radixBase;
    }
  };

  var countingSortForRadix = function (ary, radixBase, significantDigit, minValue) {
    var i, countsIndex,
      counts = new Array(radixBase),
      aux = new Array(radixBase);

    for (i = 0; i < radixBase; i++) {
      counts[i] = 0;
    }

    for (i = 0; i < ary.length; i++) {
      countsIndex = Math.floor(((ary[i] - minValue) / significantDigit) % radixBase);
      counts[countsIndex]++;
    }

    for (i = 1; i < radixBase; i++) {
      counts[i] += counts[i - 1];
    }

    for (i = ary.length - 1; i >= 0; i--) {
      countsIndex = Math.floor(((ary[i] - minValue) / significantDigit) % radixBase);
      aux[--counts[countsIndex]] = ary[i];
    }

    for (i = 0; i < ary.length; i++) {
      ary[i] = aux[i];
    }

    return ary;
  };

  this.sequentialSearch = function (item) {

    for (var i = 0; i < ary.length; i++) {
      if (item === ary[i]) {
        return i;
      }
    }

    return -1;
  };

  this.findMaxValue = function () {
    var max = ary[0];
    for (var i = 1; i < ary.length; i++) {
      if (max < ary[i]) {
        max = ary[i];
      }
    }

    return max;
  };

  this.findMinValue = function () {
    var min = ary[0];
    for (var i = 1; i < ary.length; i++) {
      if (min > ary[i]) {
        min = ary[i];
      }
    }

    return min;
  };

  this.binarySearch = function (item) {
    this.quickSort();

    var low = 0,
      high = ary.length - 1,
      mid, element;

    while (low <= high) {
      mid = Math.floor((low + high) / 2);
      element = ary[mid];
      console.log('mid element is ' + element);
      if (element < item) {
        low = mid + 1;
        console.log('low is ' + low);
      } else if (element > item) {
        high = mid - 1;
        console.log('high is ' + high);
      } else {
        console.log('found it');
        return mid;
      }
    }
    return -1;
  };
};


function testFn(n) {
  let ary = new ArrayList();
  n.forEach((item) => {
    ary.insert(item);
  })
  return ary;
}

let a = [3, 5, 1, 6, 4, 7, 2];
let array = testFn(a);

console.log('***** bubble-sort *****');
console.log(array.toString());
// array.bubbleSort();

// array.modiBubbleSort();


console.log('***** selection-sort *****');
// array.selectionSort();

console.log('***** inserttion-sort *****');
// array.insertionSort();

console.log('********** Merge Sort **********');
// array.mergeSort();

console.log('********** Quick Sort **********');
// array.quickSort();

console.log('********** Heap Sort **********');
// array.heapSort();

console.log('********** Counting Sort **********');
array.countingSort();

console.log(array.toString());
