"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 * @Author         : yum
 * @Date           : 2020-11-17 23:35:50
 * @LastEditors    : yum
 * @LastEditTime   : 2020-11-18 00:44:29
 * @Description    : test
 */

require("babel-register");

var indF = require("./src/index");

var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core').transform(es6Code, {
  presets: ['es2015']
}).code;
// '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
console.log('es5Code: ', es5Code);
console.log('es5CodeType: ', typeof es5Code === "undefined" ? "undefined" : _typeof(es5Code));

console.log(indF.sayHi());

var sayHello = function sayHello() {
  console.log('Hello, world!');
};

sayHello();
