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
    colorId: "1",
  },
  {
    id: nanoid(),
    title: "Note 2",
    colorId: "2",
  },
  {
    id: nanoid(),
    title: "Note 3",
    colorId: "2",
  },
];

app.get("/notes", (req, res) => res.send(notes));

app.post("/notes", (req, res) => {
  const note = {
    id: nanoid(),
    title: req.body.title,
    colorId: req.body.colorId,
  };
  notes.push(note);
  return res.send(note);
});

app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  const index = notes.findIndex((note) => note.id == id);
  if (index > -1) {
    notes.splice(index, 1);
  }

  res.send(notes);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.green.bold));
