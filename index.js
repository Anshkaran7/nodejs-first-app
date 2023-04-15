const express = require("express");
const path = require("path");
const app = express();

const users = [];

//using middlewares
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
// console.log(path.join(path.resolve(), "public"))

//setting up view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { name: "Karan" });
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.post("/contact", (req, res) => {
  // console.log(req.body);
  // console.log(req.body.name);
  users.push({ username: req.body.name, email: req.body.email });
  res.redirect("/success");
});
app.get("/users", (req,res)=>{
  res.json({
    users
  }
  )
})
app.listen(5000, () => {
  console.log("Server is running");
});
