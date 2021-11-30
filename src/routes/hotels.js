"use strict";
const express = require("express");
const bearer = require("../middleware/bearer");
const { hotel } = require("../models");
const { room } = require("../models");


const router = express.Router();

router.post('/hotel',handleCreateHotels);
router.get('/hotel',handleGetHotels)
router.post('/hotel/rooms',handleCreateRooms);
router.get('/hotel/rooms',handleGetRooms)

async function handleCreateHotels(req,res){
    const obj=req.body;
    const newRecord= await hotel.create(obj);
    res.status(201).json(newRecord)
}
async function handleGetHotels(req,res){
    // const id=req.params.id
    const allRecords= await hotel.get();
    res.status(200).json(allRecords)
}
async function handleCreateRooms(req,res){
    const obj=req.body;
    const newRecord= await room.create(obj);
    res.status(201).json(newRecord)
}
async function handleGetRooms(req,res){
    // const id=req.params.id
    const allRecords= await room.get();
    res.status(200).json(allRecords)
}

module.exports=router