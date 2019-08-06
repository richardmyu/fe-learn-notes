var x = 5
var addX = function(value) {
  return value + x
}
exports.reducer = function(value) {
  return x - value
}
exports.timeTest = function() {
  console.log(Date.parse(new Date()))
  return Date.now()
}
module.exports.x = x
module.exports.addX = addX

var jquery = require('jquery')
exports.$ = jquery
console.log(module)
