"use strict";
const express = require("express");
const bearer = require("../middleware/bearer");
const { hotel } = require("../models");

const router = express.Router();

router.post('/hotel',handleCreateHotels);
router.get('/hotel',handleGetHotels)

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

module.exports=router