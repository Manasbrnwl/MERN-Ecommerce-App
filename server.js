const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
//database config
const db = require("./config/db");
require("dotenv").config();
const authRoute = require("./routes/authRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const cors = require("cors");

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);

//rest api
app.get("/", (req, res) => {
  res.send("Welcome to ecommerce app");
});

//Port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgCyan);
});
