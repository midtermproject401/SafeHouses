"use strict";

const express = require("express");
const acl = require("../middleware/acl");
const bearer = require("../middleware/bearer");
const { users } = require("../models");
const dataModules = require("../models");

const router = express.Router();

router.param("model", (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next("Invalid Model");
  }
});

router.get("/:model", handleGetAll);
router.get("/:model/:id", handleGetOne);
router.post("/:model", handleCreate);
router.put("/:model/:id", handleUpdate);
router.delete("/:model/:id", handleDelete);
// Owners
router.put(
  "/:model/:id/:ownerName",

  // acl("updateOwn"),
  handleUpdateOwner
);

router.delete(
  "/:model/:id/:ownerName",

  // acl("deleteOwn"),
  handleDeleteOwner
);

// search location
router.get(
  "/:model/search/:location",
  bearer,
  // acl("read"),
  handleSearchLocation
);
// Profile:
router.post(
  "/:model/:userName",

  // acl("creatProfile"),
  handleCreateProfile
);
router.get(
  "/:model/user/:email",

  // acl("readProfile"),
  handleReadProfile
);
router.put(
  "/:model/user/1/:email",

  // acl("updateProfile"),
  handleUpdateProfile
);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id);
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}

// Owner

async function handleUpdateOwner(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let reqOwnerName = req.params.ownerName;
  let theRecord = await req.model.get(id);

  if (
    reqOwnerName === req.user.dataValues.username &&
    req.user.dataValues.username === theRecord.ownerName
  ) {
    let updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
  } else {
    res.status(500).json("You can only update your ads");
  }
}

async function handleDeleteOwner(req, res) {
  let id = req.params.id;
  let reqOwnerName = req.params.ownerName;

  let theRecord = await req.model.get(id);

  if (
    reqOwnerName === req.user.dataValues.username &&
    req.user.dataValues.username === theRecord.ownerName
  ) {
    let deletedRecord = await req.model.delete(id, reqOwnerName);
    res.status(200).json(`${reqOwnerName} ads id: ${id} deleted successfully `);
  } else {
    res.status(500).json("You can only delete your ads");
  }
}
// search location
async function handleSearchLocation(req, res) {
  const id = req.params.id;
  const location = req.params.location;

  let theRecords = await req.model.get(id, location);
  res.status(200).json(theRecords);
}

// Profile:
async function handleCreateProfile(req, res) {
  const userName = req.params.userName;
  const obj = req.body;

  if (userName === req.user.dataValues.username) {
    let creatProfile = await req.model.create(obj);
    res.status(200).json(creatProfile);
  } else {
    res.status(500).json("You can only create your Profile");
  }
}

async function handleReadProfile(req, res) {
  const id = req.params.id;
  const location = req.params.location;
  const email = req.params.email;

  if (email === req.user.dataValues.Email) {
    let getProfile = await req.model.get(id, location, email);
    res.status(200).json(getProfile);
  } else {
    res.status(500).json("You can only see your Profile");
  }
}

async function handleUpdateProfile(req, res) {
  const email = req.params.email;
  const obj = req.body;
  const id = req.params.id;
  if (email === req.user.dataValues.Email) {
    let updateProfile = await req.model.update(id, obj, email);
    res.status(200).json(updateProfile);
  } else {
    res.status(500).json("You can only see your Profile");
  }
}

module.exports = router;
