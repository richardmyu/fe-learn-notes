// Set

const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
	console.log(i);
}
console.log(s, typeof s, Object.prototype.toString.call(s))
console.log([...new Set('ababbc')].join(''))

let set = new Set();
let a = NaN;
let b = NaN;
set.add(5);
set.add('5');
set.add(0);
set.add(+0);
set.add(-0);
set.add(a);
set.add(b);
console.log(set.size)
console.dir(set)

console.log('>>>>>>>>>>>>>>>>>')
console.log(set.keys())
for (let item of set.keys()) {
	console.log(item);
}
console.log('>>>>>>>>>>>>>>>>>')
console.log(set.values())
for (let item of set.values()) {
	console.log(item);
}
console.log('>>>>>>>>>>>>>>>>>')
console.log(set.entries())
for (let item of set.entries()) {
	console.log(item);
}
console.log('>>>>>>>>>>>>>>>>>')
for (let x of set) {
	console.log(x);
}
console.log('>>>>>>>>>>>>>>>>>')
console.log(set.forEach((value, key) => console.log(key , ' : ' , value)))

console.log(set.delete(-0));
console.log(set.has(+0))
console.log(set.size, set)
set.clear()
console.log(set.size, set)

