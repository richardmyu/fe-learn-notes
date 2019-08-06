define(['dataService', 'jquery'], function(dataService, $) {
  'use strict'
  let name = 'Tom'
  function showMsg() {
    console.log(dataService.getMsg() + ', from ' + name)
  }
  $('body').css('background', 'red')
  return { showMsg }
})
