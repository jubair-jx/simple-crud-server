const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("My CRUD server is Running");
});

app.listen(PORT, (req, res) => {
  console.log(`Here is my server PORT ${PORT}`);
});
