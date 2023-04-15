const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(path.resolve(), "public")));
// console.log(path.join(path.resolve(), "public"))

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "Karan" });
});

app.listen(5000, () => {
  console.log("Server is running");
});
