//ES6---Map类

let map=new Map();
map.set('Gandalf','gandalf@email.com');
map.set('John','john@email.com');
map.set('Tyrion','tyrion@email.com');

console.log(map.has('Gandalf'));//true
console.log(map.size);//3
console.log(map.keys());
//MapIterator {"Gandalf", "John", "Tyrion"}
console.log(map.values());
//MapIterator {"gandalf@email.com", "john@email.com", "tyrion@email.com"}
console.log(map.get('Tyrion'));//tyrion@email.com

map.delete('John');//
console.log(map.keys());//MapIterator {"Gandalf", "Tyrion"}
console.log(map.values());//MapIterator {"Gandalf", "Tyrion"}

map.clear();
console.log(map.keys());//MapIterator {}