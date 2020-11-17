const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var clients = []

io.on('connection', socket => {

    clients.push(socket.id)
    io.emit('client', clients.length)

    socket.on('message', data => {
        socket.broadcast.emit('message', { id: socket.id, message: data })
    })

    socket.on('disconnect', () => {
        function removeClient(value) {
            var index = clients.indexOf(value);
            if (index > -1) {
                clients.splice(index, 1);
            }
        }
        removeClient(socket.id)
        io.emit('client', clients.length)

    })
});

app.use(express.static('public'))

server.listen(3000);