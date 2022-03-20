"use strict";
require("dotenv").config();

const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5656;
const authRouter = require("./routes/auth.routes");
const V2Router = require("./routes/v2.route");
const notFoundHandler = require("./error-handlers/404.js");
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use("/api/v2", V2Router);

app.get("/erro", (req, res) => {
  throw new Error("Error");
});
// app.use("*", notFoundHandler);
app.use(notFoundHandler);


////////////////////////////////////////////////////////////////


function start() {
  app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
  });
}

module.exports = {
  start,
  app,
};
