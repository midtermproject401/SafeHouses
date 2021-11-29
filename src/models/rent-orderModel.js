"use strict";

const rent = (sequelize, DataTypes) =>
  sequelize.define("rentedHouses", {
    location: { type: DataTypes.STRING, allowNull: false },
    Description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    ownerName: { type: DataTypes.STRING, allowNull: false },
    paymentMethod: { type: DataTypes.STRING, allowNull: false },
  });

module.exports = rent;