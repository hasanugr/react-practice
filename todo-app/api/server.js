const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const { json } = require("body-parser");
const { nanoid } = require("nanoid");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(json());

let todos = [
  {
    id: nanoid(),
    title: "todo 1",
    isCompleted: true,
  },
  {
    id: nanoid(),
    title: "todo 2",
    isCompleted: true,
  },
  {
    id: nanoid(),
    title: "todo 3",
    isCompleted: true,
  },
  {
    id: nanoid(),
    title: "todo 4",
    isCompleted: false,
  },
  {
    id: nanoid(),
    title: "todo 5",
    isCompleted: false,
  },
];

app.get("/todos", (req, res) => res.send(todos));

app.post("/todos", (req, res) => {
  const todo = { title: req.body.title, id: nanoid(), isCompleted: false };
  todos.push(todo);
  return res.send(todo);
});

app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const isCompleted = Boolean(req.body.isCompleted);
  if (index > -1) {
    todos[index].isCompleted = isCompleted;
  }
  return res.send(todos[index]);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }

  res.send(todos);
});

app.patch("/todos/", (req, res) => {
  const ids = req.body.ids;
  const filteredTodos = todos.filter((item) => !ids.includes(item.id));
  todos = filteredTodos;

  res.send(todos);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
