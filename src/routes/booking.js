"use strict";
const express = require("express");
const bearer = require("../middleware/bearer");
const { book } = require("../models");
const { room } = require("../models");
require("dotenv").config();

const router = express.Router();


router.post("/booking/:id", handleBooked);

async function handleBooked(req, res, next) {
  const obj = req.body;
  const id = req.params.id;
  let record = await room.get(id);

  console.log(record);
  let newBooking = await book.create(obj);

  // real-time communication :
  const bookConnection = require("socket.io-client");

  let host = "http://localhost:5000/booking";

  const socket = bookConnection.connect(host); // to connect to /namespace
  socket.emit("book-detect", { msg: newBooking });
  socket.emit("respond-detect", { msg: record,booking:newBooking});

  res.status(201).json(newBooking);
  next();
}

module.exports = router;
