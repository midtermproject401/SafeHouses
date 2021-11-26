"use strict";

const house = (sequelize, DataTypes) =>
  sequelize.define("houses", {
    location: { type: DataTypes.STRING, allowNull: false },
    Description: { type: DataTypes.STRING, allowNull: false },
    img: { type: DataTypes.STRING },
    rentDuration: {
      type: DataTypes.ENUM("monthly", "daily", "yearly", "weekly"),
      required: true,
    },
    price: { type: DataTypes.STRING, allowNull: false },
    ownerName: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
  });

module.exports = house;
