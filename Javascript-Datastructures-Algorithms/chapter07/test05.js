//2.线性查探
//增加新元素时，若索引index被占据，就尝试index+1...
//优点：
//

function HashLinearProbing(){

  var table = [];

  var ValuePair = function(key, value){
    this.key = key;
    this.value = value;

    this.toString = function() {
      return '[' + this.key + ' - ' + this.value + ']';
    }
  };

  var loseloseHashCode = function (key) {
    var hash = 0;
    for (var i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  };

  var hashCode = function(key){
    return loseloseHashCode(key);
  };

  this.put = function(key, value){
    var position = hashCode(key);
    console.log(position + ' - ' + key);

    if (table[position] == undefined) {
      table[position] = new ValuePair(key, value);
    } else {
      var index = ++position;
      while (table[index] != undefined){
        index++;
      }
      table[index] = new ValuePair(key, value);
    }
  };

  this.get = function(key) {
    var position = hashCode(key);

    if (table[position] !== undefined){
      if (table[position].key === key) {
        return table[position].value;
      } else {
        var index = ++position;
        while (table[index] !== undefined && (table[index] && table[index].key !== key)){
          index++;
        }
        if (table[index] && table[index].key === key) {
          return table[index].value;
        }
      }
    } else { //search for possible deleted value
      var index = ++position;
      while (table[index] == undefined || index == table.length ||
      (table[index] !== undefined && table[index] && table[index].key !== key)){
        index++;
      }
      if (table[index] && table[index].key === key) {
        return table[index].value;
      }
    }
    return undefined;
  };

  this.remove = function(key){
    var position = hashCode(key);

    if (table[position] !== undefined){
      if (table[position].key === key) {
        table[position] = undefined;
      } else {
        var index = ++position;
        while (table[index] === undefined || table[index].key !== key){
          index++;
        }
        if (table[index].key === key) {
          table[index] = undefined;
        }
      }
    }
  };

  this.print = function() {
    for (var i = 0; i < table.length; ++i) {
      if (table[i] !== undefined) {
        console.log(i + ' -> ' + table[i].toString());
      }
    }
  };
}

// function HashLinearProbing() {
//   let table = [];
//   let ValuePair = function (key, value) {
//     this.key = key;
//     this.value = value;
//     this.toString = function () {
//       return '[' + this.key + ' - ' + this.value + ']';
//     }
//   };
//
//   let loseloseHashCode = function (key) {
//     let hash = 0;
//     for (let i = 0; i < key.length; i++) {
//       hash += key.charCodeAt(i);
//     }
//     return hash % 37;
//   };
//
//   let hashCode = function (key) {
//     return loseloseHashCode(key);
//   };
//
//   this.put = function (key, value) {
//     let position = hashCode(key);
//     console.log(position + ' - ' + key);
//
//     if (table[position] == undefined) {
//       table[position] = new ValuePair(key, value);
//     } else {
//       let index = ++position;
//       while (table[index] != undefined) {
//         index++;
//       }
//       table[index] = new ValuePair(key, value);
//     }
//   };
//
//   this.get = function (key) {
//     let position = hashCode(key);
//     if (table[position] !== undefined) {
//
//       if (table[position].key === key) {
//         return table[position].value;
//       } else {
//         let index = ++position;
//         while (table[index] !== undefined && (table[index] && table[index].key !== key)) {
//           index++;
//         }
//         if (table[index] && table[index].key === key) {
//           return table[index].value;
//         }
//       }
//     } else {
//       let index = ++position;
//       while (table[index] == undefined || index == table.length || (table[index] !== undefined && table[index] && table[index].key !== key)) {
//         index++;
//       }
//       if (table[index] && table[index].key === key) {
//         return table[index].value;
//       }
//     }
//     return undefined;
//   };
//
//   this.remove = function (key) {
//     let position = hashCode(key);
//
//     if (table[position] !== undefined) {
//       if (table[position].key === key) {
//         table[position] = undefined;
//       } else {
//         let index = ++position;
//         while (table[index] === undefined || table[index].key !== key) {
//           index++;
//         }
//         if (table[index].key === key) {
//           table[index] = undefined;
//         }
//       }
//     }
//   };
//
//   this.print = function () {
//     for (let i = 0; i < table.length; i++) {
//       if (table[i] !== undefined) {
//         console.log(i + ' -> ' + table[i].toString());
//       }
//     }
//   };
// };

let hash = new HashLinearProbing();
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

console.log('**** Printing Hash **** ');

hash.print();

//5 -> [Jonathan - jonathan@email.com]
//6 -> [Jamie - Jamie@email.com]
//7 -> [Sue - sue@email.com]

//10 -> [Nathan - nathan@email.com]
//13 -> [Ana - Ana@email.com]
//15 -> [Donna - donna@email.com]

//16 -> [Tyrion - tyrion@eamil.com]
//17 -> [Aaron - aaron@email.com]
//19 -> [Gandalf - gandalf@email.com]

//29 -> [John - john@email.com]
//32 -> [Mindy - mindy@email.com]
//33 -> [Paul - paul@email.com]

console.log('**** Get **** ');

console.log(hash.get('Nathan'));

//以下代码会导致浏览器崩溃？？？目前不明，使用源码，也是同样的问题
// console.log(hash.get('Loiane'));

// console.log('**** Remove **** ');
//
// hash.remove('Gandalf');
// console.log(hash.get('Gandalf'));
// hash.print();
//
// console.log('**** Remove Test 2 **** ');
// console.log('Removing Jonathan', hash.remove('Jonathan'));
// console.log('**** Print **** ');
// hash.print();
// console.log('Get Jamie', hash.get('Jamie'));
// console.log('**** Print **** ');
// hash.print();