// Map
const m = new Map();
const o = { p: 'Hello World' };

m.set(o, 'content')
m.get(o) // "content"

console.log(m)
m.has(o) // true
m.delete(o) // true
m.has(o) // false

const map = new Map([
	['name', '张三'],
	['title', 'Author']
]);
console.log(map)
console.dir(map)
console.log(map.size) // 2
console.log(map.has('name')) // true
console.log(map.get('name')) // "张三"
console.log(map.has('title')) // true
console.log(map.get('title')) // "Author"

map.forEach((value, key, map) => {
	console.log('value ', value, ' key ', key, map)
})


