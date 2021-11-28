"use strict";

module.exports = (capability) => {
  return (req, res, next) => {
    console.log("0000000000000000000000", capability);
    console.log("0000000000000000000000", req.user.capabilities);
    try {
      if (req.user.capabilities.includes(capability)) {
        next();
      } else {
        next("Access Denied");
      }
    } catch (e) {
      next("Invalid Login");
    }
  };
};
