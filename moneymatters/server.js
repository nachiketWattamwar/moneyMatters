const express = require("express");
const app = express();
const port = 3001;

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api", (req, res) => {
  res.send("1001");
});
app.use("/temp", (req, res) => res.send("resting"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
