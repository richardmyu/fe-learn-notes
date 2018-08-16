//散列表冲突
function HashTable() {
  let table = [];
  let loseloseHashCode = function (key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };
  this.put = function (key, value) {
    let position = loseloseHashCode(key);
    console.log(position + ' - ' + key);
    table[position] = value;
  };
  this.remove = function (key) {
    table[loseloseHashCode(key)] = undefined;
  };
  this.get = function (key) {
    return table[loseloseHashCode(key)];
  };

  //在控制台输出HashTable的值
  this.print = function () {
    for (let i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(i + ': ' + table[i]);
      }
    }
  };
};

let hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');//19 - Gandalf
hash.put('John', 'john@email.com');//29 - John
hash.put('Tyrion', 'tyrion@eamil.com');//16 - Tyrion
hash.put('Aaron', 'aaron@email.com');//16 - Aaron
hash.put('Donna', 'donna@email.com');//15 - Donna
hash.put('Ana', 'Ana@email.com');//13 - Ana
hash.put('Jonathan', 'jonathan@email.com');//5 - Jonathan
hash.put('Jamie', 'Jamie@email.com');//5 - Jamie
hash.put('Sue', 'sue@email.com');//5 - Sue
hash.put('Mindy', 'mindy@email.com');//32 - Mindy
hash.put('Paul', 'paul@email.com');//32 - Paul
hash.put('Nathan', 'nathan@email.com');//10 - Nathan

hash.print();
//5: sue@email.com
//10: nathan@email.com
//13: Ana@email.com
//15: donna@email.com
//16: aaron@email.com
//19: gandalf@email.com
//29: john@email.com
//32: paul@email.com

//散列值相同时，后添加的会覆盖先添加的
//解决办法：1.分离链接；2.线性查探；3.双散列法

//分离链接和线性查探，只需重写三个方法：put、get和remove

