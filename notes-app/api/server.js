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

let notes = [
  {
    id: nanoid(),
    title: "Note 1",
    colorCode: "#444555",
  },
  {
    id: nanoid(),
    title: "Note 2",
    colorCode: "#123666",
  },
  {
    id: nanoid(),
    title: "Note 3",
    colorCode: "#888666",
  },
];

app.get("/notes", (req, res) => res.send(notes));

app.post("/notes", (req, res) => {
  const note = {
    id: nanoid(),
    title: req.body.title,
    colorCode: req.body.colorCode,
  };
  notes.push(note);
  return res.send(note);
});

app.patch("/notes/:id", (req, res) => {
  const id = req.params.id;
  const index = notes.findIndex((note) => note.id == id);
  const isCompleted = Boolean(req.body.isCompleted);
  if (index > -1) {
    notes[index].isCompleted = isCompleted;
  }
  return res.send(notes[index]);
});

app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  const index = notes.findIndex((note) => note.id == id);
  if (index > -1) {
    notes.splice(index, 1);
  }

  res.send(notes);
});

app.patch("/notes/", (req, res) => {
  const ids = req.body.ids;
  const filterednotes = notes.filter((item) => !ids.includes(item.id));
  notes = filterednotes;

  res.send(notes);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
