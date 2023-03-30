const express = require('express');
const http = require('http');
const colyseus = require('colyseus');
const ChatRoom = require('./chat-room');

const app = express();
const server = http.createServer(app);
const gameServer = new colyseus.Server({ server });

app.use(express.static('public'));

// Create a new chat room with the specified name
app.get('/chat/:roomName', (req, res) => {
    const room = gameServer.define('chat_' + req.params.roomName, ChatRoom);
    res.sendFile(__dirname + '/views/index.html');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
