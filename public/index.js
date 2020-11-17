const clientCount = document.getElementById('client-count')
const messageInput = document.getElementById('message-input')
const sendButton = document.getElementById('send-button')
const conversationBox = document.getElementById('conversation-box')

var socket = io()

socket.on('client', data => {
    clientCount.innerText = data
})
socket.on('message', data => {
    const text = document.createElement('p')
    text.classList.add('text')
    text.classList.add('recieved')
    text.innerText = data.message
    text.setAttribute('data-before', data.id)
    conversationBox.appendChild(text)
})

sendButton.addEventListener('click', e => {
    e.preventDefault()
    if (messageInput.value != '') {
        const text = document.createElement('p')
        text.classList.add('text')
        text.classList.add('sent')
        text.innerText = messageInput.value
        conversationBox.appendChild(text)
        socket.emit('message', messageInput.value)
        messageInput.value = ''
    }
})

document.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        sendButton.click()
    }
})