var express = require('express')
var app = express()
var request = require('request')
var nunjucks = require('nunjucks')
var compression = require('compression')
var path = require('path')
var io = require('socket.io')

app.use(compression())
app.use(express.static('public'))

nunjucks.configure('public/views', {
  autoescape: true,
  express: app
})

app.get('/', function (req, res) {
  res.render('index.html', {})
})

app.listen(5000, function () {
  console.log('server is running on port 5000')
})
