const { Schema, MapSchema } = require("@colyseus/schema");
const { Server, Room } = require("colyseus");

// Define a schema for the game state
class GameState extends Schema {
  constructor() {
    super();
    this.questions = new MapSchema();
    this.currentQuestionIndex = 0;
    this.scores = new MapSchema();
    this.gameStarted = false;
  }
}

// Define a schema for player state
class PlayerState extends Schema {
  constructor() {
    super();
    this.score = 0;
    this.answer = "";
  }
}

// Define a room to handle game sessions
class QuizRoom extends Room {
  maxClients = 2;
  onCreate(options) {
    console.log("QuizRoom created!", options);

    // Generate a list of questions for the quiz
    const questions = [
      { question: "What is the capital of France?", answer: "Paris" },
      { question: "What is the highest mountain in the world?", answer: "Mount Everest" },
      { question: "What is the largest country in the world?", answer: "Russia" }
    ];

    // Add the questions to the game state
    questions.forEach((q, i) => {
      this.state.questions[i] = q;
    });

    // Set up event listeners for client messages
    this.onMessage("start_game", (client, message) => this.startGame(client));
    this.onMessage("submit_answer", (client, message) => this.submitAnswer(client, message));
  }

  // Handle client connection and disconnection
  onJoin(client) {
  }

  onLeave(client) {
  }

  // Handle game events
  // startGame(client) {
  //   this.state.gameStarted = true;
  //   this.broadcast("game_started");
  //   this.sendQuestion(client);
  // }

  // submitAnswer(client, message) {
  //   const playerId = client.sessionId;
  //   const playerState = this.state.scores[playerId];
  //   playerState.answer = message.answer;

  //   // Check if both players have answered the question
  //   const playersAnswered = Object.values(this.state.scores).every((p) => p.answer !== "");
  //   if (playersAnswered) {
  //     this.checkAnswers();
  //   }
  // }

  // checkAnswers() {
  //   const players = Object.entries(this.state.scores);

  //   // Check if the answers match and update scores
  //   if (players[0][1].answer.toLowerCase() === players[1][1].answer.toLowerCase()) {
  //     players.forEach(([playerId, playerState]) => {
  //       playerState.score += 1;
  //     });
  //   }

  //   // Send updated scores and move to next question
  //   this.broadcast("update_scores", this.state.scores);
  //   this.moveToNextQuestion();
  // }

  // moveToNextQuestion() {
  //   this.state.currentQuestionIndex += 1;
  //   if (this.state.currentQuestionIndex < Object.keys(this.state.questions).length) {
  //     this.broadcast("next_question");
  //   } else {
  //     this.endGame();
  //   }
  // }

  // endGame() {
  //   this.broadcast("game_ended", this.state.scores);
  // }

  // sendQuestion(client) {
  //   const question = this.state.questions[this.state.currentQuestionIndex];
  //   client.send("question", question);
  // }
}

module.exports = QuizRoom;