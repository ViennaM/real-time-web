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
    list.innerHTML += '<li> <svg enable-background="new 0 0 8.6 10.3" version="1.1" viewBox="0 0 8.6 10.3" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m8.6 8.5c0 0.5-0.1 0.9-0.4 1.3s-0.6 0.5-1 0.5h-5.8c-0.4 0-0.7-0.2-1-0.5s-0.4-0.8-0.4-1.3c0-0.4 0-0.7 0.1-1.1 0-0.3 0.1-0.7 0.2-1s0.2-0.6 0.4-0.9c0.1-0.2 0.3-0.4 0.6-0.6s0.6-0.2 0.9-0.2c0.6 0.6 1.3 0.9 2.1 0.9s1.5-0.3 2.1-0.9c0.3 0 0.6 0.1 0.9 0.2 0.3 0.2 0.5 0.4 0.6 0.6 0.2 0.2 0.3 0.5 0.4 0.9 0.1 0.3 0.2 0.7 0.2 1 0.1 0.4 0.1 0.7 0.1 1.1zm-2.5-7.7c0.5 0.5 0.8 1.1 0.8 1.8s-0.3 1.3-0.8 1.8-1.1 0.7-1.8 0.7-1.3-0.2-1.8-0.7-0.8-1.1-0.8-1.8 0.3-1.3 0.8-1.8 1.1-0.8 1.8-0.8 1.3 0.3 1.8 0.8z"/></svg>' + people[key] + '</li>'
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
  previewCSS.innerHTML = '.html ' + code.replace(/}/g, '} .html ')
  parseCSS.value = code
})

socket.on('userCount', function (userCount) {
  userCountEl.innerHTML = userCount
})