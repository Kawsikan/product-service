const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const categoryAPI = require("./api/category.api");
const vehicleAPI = require("./api/vehicle.api");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.log("Database Error: ", error.message);
    }
  }
);

mongoose.connection.once("open", () => {
  console.log("Database connected successfully");
});

app.use("/product-service/category", categoryAPI());

app.use("/product-service/vehicle", vehicleAPI());

app.get("/", (req, res) => {
  res.status(200).send("Hello World from Product Service!");
});

module.exports = app;

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});
