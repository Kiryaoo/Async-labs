const EventEmitter = require('events');


class MessageService extends EventEmitter {
    sendMessage(message) {
        console.log('Sending message:', message);
        this.emit('messageSent', message);
    }
}


const messageService = new MessageService();


messageService.on('messageSent', (message) => {
    console.log('Received message:', message);
});


messageService.sendMessage('Hello, World!');
