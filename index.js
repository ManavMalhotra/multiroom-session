const express = require('express');
const http = require('http');
const colyseus = require('colyseus');
const ChatRoom = require('./chat-room');

const { Server, Room } = require("colyseus");

const QuizRoom = require("./quiz");
const app = express();
const server = http.createServer(app);
const gameServer = new colyseus.Server({ server });

app.use(express.static('public'));
app.set("view engine", "ejs");
app.use("views", express.static(__dirname + "/views"));

// Create a new chat room with the specified name
app.get('/chat/:roomName', (req, res) => {
    const room = gameServer.define('chat_' + req.params.roomName, ChatRoom);
    res.render("index",{room:'chat_' + req.params.roomName});
});


// Create a new quiz room with the specified name

app.get('/quiz/:roomName', (req, res) => {
    gameServer.define("test-quiz-room", QuizRoom);
    res.render("quiz",{roomName:"test-quiz-room"});
});

server.listen(3000, () => {  
  console.log("Colyseus Server Version : ", server.version)
  console.log('Server listening on port 3000');
});
