define(function(require, exports, module) {
  var data = '娃哈哈加快科技'
  function show() {
    console.log('module1--', data)
  }
  exports.show = show
})

// define(function (require, exports, module) {
//   //内部变量数据
//   var data = 'atguigu.com'
//   //内部函数
//   function show() {
//     console.log('module1 show() ' + data)
//   }
//   //向外暴露
//   exports.show = show
// })
