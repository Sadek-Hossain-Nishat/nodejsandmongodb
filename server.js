const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

const AuthRoute = require("./routes/auth");
const EmployeeRoute = require("./routes/employee");

mongoose.connect("mongodb://localhost:27017/migodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("strictQuery", false);

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Database connection is established");
});

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});

app.use("/api", AuthRoute);

app.use("/api/employee", EmployeeRoute);

// to see the file in a route
// i mean public access
app.use("/uploads", express.static("uploads"));
