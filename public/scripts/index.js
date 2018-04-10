var socket = io()
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault()
  if (document.querySelector('#m').value) {
    socket.emit('chat message', document.querySelector('#m').value)
    document.querySelector('#m').value = ''
  }
  return false
})
socket.on('chat message', function (msg) {
  document.querySelector('#messages').insertAdjacentHTML('beforeend', '<li>' + msg + '</li>')
})
