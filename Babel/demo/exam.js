/*
 * @Author         : yum
 * @Date           : 2020-11-17 23:35:50
 * @LastEditors    : yum
 * @LastEditTime   : 2020-11-18 01:31:14
 * @Description    : test
 */

require("babel-register");

let indF = require("./src/index");

var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['es2015']
  })
  .code;
// '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
console.log('es5Code: ', es5Code);
console.log('es5CodeType: ', typeof es5Code);

console.log(indF.sayHi());

const sayHello = () => {
  console.log('Hello, world!');
};

sayHello();
