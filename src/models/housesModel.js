"use strict";

const house = (sequelize, DataTypes) =>
  sequelize.define("houses", {
    location: { type: DataTypes.STRING, allowNull: false },
    Description: { type: DataTypes.STRING, allowNull: false },
    imgHero: { type: DataTypes.STRING },
    img1: { type: DataTypes.STRING },
    img2: { type: DataTypes.STRING },
    img3: { type: DataTypes.STRING },
    rentDuration: {
      type: DataTypes.ENUM("monthly", "daily", "yearly", "weekly"),
      required: true,
    },
    price: { type: DataTypes.STRING, allowNull: false },
    state: {
      type: DataTypes.ENUM("availabe", "rented"),
      required: true,
    },
    ownerName: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },

  });

module.exports = house;
