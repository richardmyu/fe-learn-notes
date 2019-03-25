// 良好的散列函数：
// 1.插入和检索元素的时间（即性能）
// 2.较低的冲突可能性
//djb2
//这不是最好的散列函数，但是是社区最推崇的散列函数之一


function HashLinearProbing() {
  let table = [];
  let ValuePair = function (key, value) {
    this.key = key;
    this.value = value;
    this.toString = function () {
      return '[' + this.key + ' - ' + this.value + ']';
    }
  };

  /*let loseloseHashCode = function (key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };*/

  let djb2HashCode = function (key) {
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = hash * 33 + key.charCodeAt(i);
    }
    //大于散列表的大小的随机质数
    return hash % 1013;
  };

  let hashCode = function (key) {
    return djb2HashCode(key);
  };

  this.put = function (key, value) {
    let position = hashCode(key);
    console.log(position + ' - ' + key);

    if (table[position] === undefined) {
      table[position] = new ValuePair(key, value);
    } else {
      let index = ++position;
      while (table[index] !== undefined) {
        index++;
      }
      table[index] = new ValuePair(key, value);
    }
  };

  this.get = function (key) {
    let position = hashCode(key);
    if (table[position] !== undefined) {
      if (table[position].key === key) {
        return table[position].value;
      } else {
        let index = ++position;
        while (table[index] && table[index].key === key) {
          return table[index].value;
        }
      }
    } else {
      let index = ++position;
      while (table[index] === undefined || index === table.length || (table[index] !== undefined && table[index] && table[index].key !== key)) {
        index++;
      }
      if (table[index] && table[index].key === key) {
        return table[index].value;
      }
    }
    return undefined;
  };

  this.remove = function (key) {
    let position = hasCode(key);
    if (table[position] !== undefined) {
      if (table[position].key === key) {
        table[position] = undefined;
      } else {
        let index = ++position;
        while (table[index] === undefined || table[index].key !== key) {
          index++;
        }
        if (table[index].key === key) {
          table[index] = undefined;
        }
      }
    }
  };

  this.print = function () {
    for (let i = 0; i < table.length; i++) {
      if (table[i] !== undefined) {
        console.log(i + ' -> ' + table[i].toString());
      }
    }
  };
};

let hash = new HashLinearProbing();
hash.put('Gandalf', 'gandalf@email.com');//798 - Gandalf
hash.put('John', 'john@email.com');//838 - John
hash.put('Tyrion', 'tyrion@eamil.com');//624 - Tyrion
hash.put('Aaron', 'aaron@email.com');//215 - Aaron
hash.put('Donna', 'donna@email.com');//642 - Donna
hash.put('Ana', 'Ana@email.com');//925 - Ana
hash.put('Jonathan', 'jonathan@email.com');//288 - Jonathan
hash.put('Jamie', 'Jamie@email.com');//962 - Jamie
hash.put('Sue', 'sue@email.com');//502 - Sue
hash.put('Mindy', 'mindy@email.com');//804 - Mindy
hash.put('Paul', 'paul@email.com');//54 - Paul
hash.put('Nathan', 'nathan@email.com');//223 - Nathan

hash.print();
//54 -> [Paul - paul@email.com]
// 215 -> [Aaron - aaron@email.com]
// 223 -> [Nathan - nathan@email.com]
// 288 -> [Jonathan - jonathan@email.com]
// 502 -> [Sue - sue@email.com]
// 624 -> [Tyrion - tyrion@eamil.com]
// 642 -> [Donna - donna@email.com]
// 798 -> [Gandalf - gandalf@email.com]
// 804 -> [Mindy - mindy@email.com]
// 838 -> [John - john@email.com]
// 925 -> [Ana - Ana@email.com]
// 962 -> [Jamie - Jamie@email.com]