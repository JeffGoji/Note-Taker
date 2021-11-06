const express = require("express");
const notes = require("./db/db.json");
const router = express.Router();
const fs = require("fs");

//Express app:
const app = express();

//API route:
router.get("/api/notes", (req, res) => {
  return res.json(notes);
});

//current note ID:
currentId = notes.length;

//POST methods:
router.post("/api/notes", (req, res) => {
  const newNote = req.body;

  newNote["id"] = currentId + 1;
  currentId++;
  console.log(newNote);

  //Push the new note:
  notes.push(newNote);

  //Create notes:
  createNotes();
  return res.status(200).end();
});

//Deletes note according to which ID it has:
router.delete("/api/notes/:id", function (req, res) {
  notes.splice(req.params.id, 1);
  createNotes();
  console.log("Deleted note with id " + req.params.id);
  return res.status(200).end();
});

//Write note function:
const createNotes = (createNotes) => {
  fs.writeFile(`${__dirname}/db/db.json`, JSON.stringify(notes), (err) => {
    if (err) {
      console.log("error");
      return console.log(err);
    }
  });
};

module.exports = router;
