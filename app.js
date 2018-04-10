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

var userCount = 0
var htmlCode 
var cssCode

app.get('/', function (req, res) {
  res.render('index.html', {
    htmlCode: htmlCode,
    cssCode: cssCode,
    userCount: userCount
  })
})

io.on('connection', function (socket) {
  console.log(userCount)
  userCount ++
  io.emit('userCount', userCount)
  socket.on('disconnect', function () {
    console.log(userCount)
    io.emit('userCount', userCount)
    userCount --
  })
})

io.on('connection', function (socket) {
  socket.on('editorHTML', function (code) {
    io.emit('editorHTML', code)
    console.log(userCount)
    htmlCode = code
  })
})
io.on('connection', function (socket) {
  socket.on('editorCSS', function (code) {
    console.log(userCount)
    io.emit('editorCSS', code)
    cssCode = code
  })
})

http.listen(5000, function () {
  console.log('server is running on port 5000')
})
