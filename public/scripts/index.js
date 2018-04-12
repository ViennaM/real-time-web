var parseHTML = document.querySelector('#editorHTML')
var previewHTML = document.querySelector('.html')

var parseCSS = document.querySelector('#editorCSS')
var previewCSS = document.querySelector('.css style')

var userCountEl = document.querySelector('h2 span')

previewHTML.innerHTML = parseHTML.value
previewCSS.innerHTML = '.html ' + parseCSS.value.replace('}', '} .html ')

var socket = io()

document.querySelector('header div').style.display = 'none'

document.querySelector('#join').addEventListener('click', function (e) {
  e.preventDefault
  joinCollab()
})

document.querySelector('#name').addEventListener('keypress', function (e) {
  var key = e.which || e.keyCode
  if (key === 13) {
    joinCollab()
  }
})

function joinCollab() {
  var name = document.querySelector('#name').value
  if (name !== '') {
    document.querySelector('#login').style.display = 'none'
    document.querySelector('header div').style.display = 'block'
    socket.emit('join', name)
    return false
  }
}

socket.on('update-people', function (people) {
  var list = document.querySelector('ul')
  list.innerHTML = ''

  for (var key in people) {
    if (!people.hasOwnProperty(key)) continue
    list.innerHTML += '<li>' + people[key] + '</li>'
  }
})

parseHTML.addEventListener('input', function () {
  socket.emit('editorHTML', parseHTML.value)
  return false
})

socket.on('editorHTML', function (code) {
  previewHTML.innerHTML = code
  parseHTML.value = code
})

document.querySelector('#editorCSS').addEventListener('input', function () {
  socket.emit('editorCSS', parseCSS.value)
  return false
})

socket.on('editorCSS', function (code) {
  previewCSS.innerHTML = '.html ' + code.replace('}', '} .html ')
  parseCSS.value = code
})

socket.on('userCount', function (userCount) {
  userCountEl.innerHTML = userCount
})