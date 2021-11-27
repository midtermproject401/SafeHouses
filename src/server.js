"use strict";
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5555;

const authRouter = require("./routes/auth.routes");
const v1Router = require("./routes/v1.route.");
require("dotenv").config();

const chatroutes = require("./routes/chatroutes");

const notFoundHandler = require("./error-handlers/404.js");
const errorHandler = require("./error-handlers/500.js");
// const logger = require('./models/logger.js');

const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(logger);

app.use(authRouter);
app.use("/api/v1", v1Router);

// app.use("*", notFoundHandler);
app.use(errorHandler);


//chat Part 
/////////////////////////////////////////////////////////////////

const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('../utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('../utils/users');

const server = http.createServer(app);
const io = socketio(server);

// Set static folder
app.use(express.static(path.join(__dirname, '../public')));

const botName = 'SafeHouse Bot';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Dont Send Any Money Before Purchese'));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `Welcome ${user.username}`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `Bye Bye ${user.username}`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

/////////////////////////////////////////////////////////////////

function start() {
 server.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
  });
}
module.exports = {
  start,
  app,
};
