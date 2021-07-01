const io = require('socket.io')(5001)

io.on('connection', socket => {
    console.log('someone connected!')
    const id = socket.handshake.id
    socket.join(id)

    socket.on('send-message', ({ recipients, text }) => {
        console.log('message successfull')
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r!== recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})

