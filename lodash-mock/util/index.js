const dataType = data => {
  let str = Object.prototype.toString.call(data)
  return str.slice(8, -1)
}

const isArray = data => {
  return dataType(data) === 'Array'
}

const isObject = data => {
  return dataType(data) === 'Object'
}

const isFunction = data => {
  return dataType(data) === 'Function'
}

const isRegExp = data => {
  return dataType(data) === 'RegExp'
}

module.exports = {
  dataType,
  isArray,
  isObject,
  isFunction,
  isRegExp
}
