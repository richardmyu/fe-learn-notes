var example = require('./example.js')

console.log(example.x) // 5
console.log(example.addX(1)) // 6
console.log(example.reducer(1)) // 4
console.log(example.timeTest())

let { timeTest } = require('./example')

console.log(timeTest())
