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

var people = {}
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
  socket.on('join', function (name) {
    socket.send(socket.id)
    people[socket.id] = name
    io.emit('userCount', userCount)
    io.emit('update-people', people)
  })
  userCount++
  socket.on('disconnect', function () {
    delete people[socket.id]
    userCount--
    io.emit('update-people', people)
    io.emit('userCount', userCount)
  })
  socket.on('editorHTML', function (code) {
    io.emit('editorHTML', code)
    htmlCode = code
  })
  socket.on('editorCSS', function (code) {
    io.emit('editorCSS', code)
    cssCode = code
  })
})

http.listen(process.env.PORT || 5000, function () {
  console.log('listening (port 5000)');
})