// 散列表
// lose lose 散列函数
function HashTable() {
  let table = [];
  // 实现散列算法
  let loseloseHashCode = function (key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };

  // put 增加新项
  this.put = function (key, value) {
    let position = loseloseHashCode(key);
    console.log(position + ' - ' + key);
    table[position] = value;
  };

  // remove
  this.remove = function (key) {
    table[loseloseHashCode(key)] = undefined;
  }

  // get
  this.get = function (key) {
    return table[loseloseHashCode(key)];
  }
};

let hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com'); // 19 - Gandalf
hash.put('John', 'john@email.com'); // 29 - John
hash.put('Tyrion', 'tyrion@email.com'); // 16 - Tyrion

console.log(hash.get('Gandalf')); // gandalf@email.com
console.log(hash.get('Loiane')); // undefined

hash.remove('Gandalf');
console.log(hash.get('Gandalf')); // undefined
