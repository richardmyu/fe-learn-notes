let count = 1
let setCount = () => {
  count++
}
setTimeout(() => {
  console.log('a', count)
}, 1000)
module.exports = {
  count,
  setCount
}
