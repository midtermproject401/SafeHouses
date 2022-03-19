"use strict";

const likedPhotos = (sequelize, DataTypes) =>
  sequelize.define("likedPhotos", {
    image: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    comment:{ type: DataTypes.STRING}
  });

module.exports = likedPhotos;