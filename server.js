const path = require("path");
const express = require("express");

const app = express();
const PORT = 8080;

app.get("/", (rqq, res) => {
  res.sendFile(path.join(__dirname + "/server/index.html"))
});

app.get("/editor.js", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/editor.bundle.js"));
});

app.get("/editor.css", (req, res) => {
  res.sendFile(path.join(__dirname + "/server/editor.css"));
});
 
app.listen(PORT, err => {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
