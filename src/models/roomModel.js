"use strict";

const room = (sequelize, DataTypes) =>
  sequelize.define("rooms", {
    accommodationType: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    Sleeps: { type: DataTypes.STRING, allowNull: false },
    hotelid: { type: DataTypes.STRING, allowNull: false },
  });

module.exports = room;