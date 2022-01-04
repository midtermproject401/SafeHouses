"use strict";
const express = require("express");
const bearer = require("../middleware/bearer");
// const { Model } = require("sequelize/types");
const { hotel } = require("../models");
const { room } = require("../models");

const router = express.Router();

router.post("/hotel", handleCreateHotels);
router.get("/hotel", handleGetHotels);
router.get("/hotel/:id", handleGetOne);
router.delete("/hotel/:id", handleDelete);
router.put("/:model/:id", handleUpdate);
router.post("/hotel/:id/rooms", handleCreateRooms);
router.get("/hotel/:id/rooms/:roomid", handleGetOneRoom);

router.get("/hotel/:id/rooms", handleGetRooms);

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await hotel.update(id, obj);
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await hotel.delete(id);
  res.status(200).json(deletedRecord);
}

async function handleCreateHotels(req, res) {
  const obj = req.body;
  const newRecord = await hotel.create(obj);
  res.status(201).json(newRecord);
}
async function handleGetHotels(req, res) {
  // const id=req.params.id
  const allRecords = await hotel.get();
  res.status(200).json(allRecords);
}
async function handleGetOne(req, res) {
  const id = req.params.id;
  const allRecords = await hotel.get(id);
  res.status(200).json(allRecords);
}
async function handleGetOneRoom(req, res) {
  const id = req.params.roomid;
  console.log(id,"roomid");
  const allRecords = await room.get(id);
  res.status(200).json(allRecords);
  // res.send('hi')
}
async function handleCreateRooms(req, res) {
  const obj = req.body;
  const newRecord = await room.create(obj);
  res.status(201).json(newRecord);
}
async function handleGetRooms(req, res) {
  // const id=req.params.id
  const allRecords = await room.get();
  res.status(200).json(allRecords);
}

module.exports = router;
