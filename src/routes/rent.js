"usr strict";
const express = require("express");
const bearer = require("../middleware/bearer");
const { rent } = require("../models");
const { house } = require("../models");

const router = express.Router();

let records = [];

async function getHouses(req, res, next) {
  let allRecords = await house.get();
  records.push(allRecords);
  next();
}

router.post("/rent/:id", bearer, getHouses, handleRent);

async function handleRent(req, res) {
  const obj = req.body;
  const id = req.params.id;
  const houses = await records[0].map((houses) => {
    return houses.dataValues;
  });

  houses.map(async (housey) => {
    if (id == housey.id) {
      if (housey.state == "availabe") {
        let newRecord = await rent.create(obj);

        const stateData = {
          location: housey.location,
          Description: housey.Description,
          price: housey.price,
          img: housey.img,
          rentDuration: housey.rentDuration,
          phoneNumber: housey.phoneNumber,
          ownerName: housey.ownerName,
          state: "rented",
        };
        let updateState = await house.update(id, stateData);
        records.pop().push(updateState);
        res.status(201).json(newRecord);
      } else if (housey.state == "rented") {
        res.status(200).json("its not available");
      }
    }
  });
}

module.exports = router;
