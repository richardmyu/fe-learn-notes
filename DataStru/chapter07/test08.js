/*ES6除了Set和Map这两种新的数据结构，
还有弱化版本：WeakSet和WeakMap
区别：
1.WeakSet和WeakMap没有entries、keys和values等方法
2.只能用对象作为键

创建和使用这两个类主要是为了性能。因为是弱化的，没有强引用的键，这使得JavaScript的垃圾回收器可以从中清除整个入口
另一个优点是：必须用键才可以取出值，这样可以保障作为私有属性或变量的安全
WeakMap类
*/

let map=new WeakMap();
let obj1={name:'Gandalf'};
let obj2={name:'John'};
let obj3={name:'Tyrion'};

map.set(obj1,'gandalf@email.com');
map.set(obj2,'john@email.com');
map.set(obj3,'tyrion@email.com');
console.log(map.has(obj1));//true
console.log(map.get(obj3));//tyrion@email.com
map.delete(obj2);



