var Backbone = require('backbone')
Backbone.$ = require('jquery/dist/jquery')(window)
var $ = require('jquery/dist/jquery')(window)

var AppView = Backbone.View.extend({
  render: function() {
    $('main').append('<h1>Browserify is a great tool.</h1>')
  }
})

var appView = new AppView()
appView.render()
