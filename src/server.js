"use strict";
require("dotenv").config();

const express = require("express");
const app = express();
require("dotenv").config();
// const { users } = require("./models/users");

const PORT = process.env.PORT || 5648;

const authRouter = require("./routes/auth.routes");
const v1Router = require("./routes/v1.route.");
const rentRouter = require("./routes/rent");


const notFoundHandler = require("./error-handlers/404.js");
const errorHandler = require("./error-handlers/500.js");
// const logger = require('./models/logger.js',,,);

const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(logger);

app.use(authRouter);
app.use("/api/v1", v1Router);
app.use(rentRouter);

app.get("/erro", (req, res) => {
  throw new Error("Error");
});
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

const botName = 'SafeHouse';

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, Advname }) => {
    const user = userJoin(socket.id, username, Advname);

    socket.join(user.Advname);

    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Dont Send Any Money Before Purchese'));
    // Broadcast when a user connects
    socket.broadcast
      .to(user.Advname)
      .emit(
        'message',
        formatMessage(botName, ` ${user.username}  view your Ads`)
      );

    // Send users and room info
    io.to(user.Advname).emit('roomUsers', {
      Advname: user.Advname,
      users: getRoomUsers(user.Advname)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
    io.to(user.Advname).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.Advname).emit(
        'message',
        formatMessage(botName, ` ${user.username} left`)
      );

      // Send users and room info
      io.to(user.Advname).emit('roomUsers', {
        Advname: user.Advname,
        users: getRoomUsers(user.Advname)
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

module.exports={
  start,
  app,
};
