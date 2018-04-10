var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var nunjucks = require('nunjucks')
var compression = require('compression')

app.use(compression())
app.use(express.static('public'))

nunjucks.configure('public/views', {
  autoescape: true,
  express: app
})

app.get('/', function (req, res) {
  res.render('index.html', {})
})

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })
})

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg)
  })
})

http.listen(5000, function () {
  console.log('server is running on port 5000')
})
