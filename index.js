const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const TodoModel = require("./Models/Todo.js");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true}).then(result => res.json(result))
    .catch(err => res.json(err))
})

app.delete('/delete/:id', (req,res) => {
    const {id} =req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.get("/", (req, res) => {
  res.send("api is running");
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("server is running");
});

mongoose.connect(process.env.MONGO_URI);
