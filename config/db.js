const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB server".bgMagenta);
});
db.on("error", (err) => {
  console.log(`Error connecting to MongoDB ${err}`.bgRed);
});
db.on("disconnected", () => {
  console.log("Database disconnected".bgWhite);
});

module.exports = db;
