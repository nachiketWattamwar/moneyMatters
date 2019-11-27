const express = require("express");
const bodyParser = require("body-parser");
const { mongoose } = require("../backend/db/mongoose");
const { Space } = require("../backend/models/space");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", (req, res) => {
  res.send("1001");
});

app.get("/deleteExpense", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  // Space.find({}, function(err, data) {
  //   console.log("==============data=========", data);
  //   res.send(data);
  // });
  console.log("inside delete backend ", req);
  res.send("from delete api");
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
