"use strict";

const booking = (sequelize, DataTypes) =>
  sequelize.define("book", {
    FirstName: { type: DataTypes.STRING, allowNull: false },
    LastName: { type: DataTypes.STRING, allowNull: false },
    checkInDate:{type:DataTypes.STRING,allowNull: false},
    checkoutDate:{type:DataTypes.STRING,allowNull: false},
    paymentMethod: { type: DataTypes.STRING, allowNull: false },
    roomId:{ type: DataTypes.INTEGER, allowNull: false },
  });

module.exports = booking;