const { name } = require("ejs");
const express = require("express");
const { default: mongoose, Mongoose, mongo } = require("mongoose");
const path = require("path");

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "Backend",
  })
  .then(() => console.log("Database connected"))
  .catch((e) => console.log(e));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Messages = mongoose.model("Message", messageSchema);

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

// app.get("/add", (req, res) => {
//   Messages.create({
//     name: "Karan",
//     email: "karan123@gmail.com",
//     message: "Hello Karan, its me Ansh",
//   }).then(() => res.send("Sent"));
// });

// app.get("/add", async (req, res) => {
//   await Messages.create({
//     name: "Ansh",
//     email: "ansh123@gmail.com",
//     message: "Hello Ansh, its me Karan",
//   });
//   res.send("Sent");
// });

app.get("/success", (req, res) => {
  res.render("success");
});


app.post("/contact", async(req, res) => {
  // console.log(req.body);
  // console.log(req.body.name);
  // users.push({
  //   username: req.body.name,
  //   email: req.body.email,
  //   message: req.body.message,
  // });

  const {name, email, message} = req.body;

 await Messages.create({name,email, message})
  res.redirect("/success");
});



app.get("/users", (req, res) => {
  res.json({
    users,
  });
});
app.listen(5000, () => {
  console.log("Server is running");
});
