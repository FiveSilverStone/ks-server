const express = require("express");
const cors = require("cors");
const { sequelize } = require("../models");
const reviewsRouter = require("./routes/reviews");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

sequelize.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("Error: " + err));

app.use("/reviews", reviewsRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);


app.listen(9999, () => console.log("Server started on port 9999"));
