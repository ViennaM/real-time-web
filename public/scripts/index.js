var parseHTML = document.querySelector('#editorHTML')
var previewHTML = document.querySelector('.html')

var parseCSS = document.querySelector('#editorCSS')
var previewCSS = document.querySelector('.css style')

var userCountEl = document.querySelector('h1 span')

previewHTML.innerHTML = parseHTML.value
previewCSS.innerHTML = '.html ' + parseCSS.value.replace('}', '} .html ')

var socket = io()

parseHTML.addEventListener('input', function () {
  socket.emit('editorHTML', parseHTML.value)
  return false
})

socket.on('editorHTML', function (code) {
  previewHTML.innerHTML = code
})

document.querySelector('#editorCSS').addEventListener('input', function () {
  socket.emit('editorCSS', parseCSS.value)
  return false
})

socket.on('editorCSS', function (code) {
  previewCSS.innerHTML = '.html ' + code.replace('}', '} .html ')
})

socket.on('userCount', function (userCount) {
  userCountEl.innerHTML = userCount
})