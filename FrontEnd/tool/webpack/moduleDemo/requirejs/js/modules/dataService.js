define(function(require, factory) {
  'use strict'
  let msg = 'goog'
  function getMsg() {
    return msg.toUpperCase()
  }
  return { getMsg }
})
