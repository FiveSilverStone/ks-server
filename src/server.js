const express = require("express");
const cors = require("cors");
const { sequelize } = require("../models");
const reviewsRouter = require("./routes/reviews");

const app = express();

app.use(cors());
app.use(express.json());

sequelize.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error: " + err));

app.use("/reviews", reviewsRouter);

app.listen(9999, () => console.log("Server started on port 5000"));
