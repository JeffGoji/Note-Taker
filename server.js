const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");

//Installed NPM Dependencies:
const express = require("express");
const nodemon = require("nodemon");

//Express app:
const app = express();

//This is needed for Heroku:
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

//Middleware:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

currentId = notes.length;

//API routes:
app.get("/api/notes", (req, res) => {
  return res.json(notes);
});

//HTML routes:
app.get("/notes", (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/notes.html`));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/public/index.html`));
});

// Access files in "public" folder
app.use(express.static(path.join(`${__dirname}/public`)));

//POST methods:
app.post("/api/notes", (req, res) => {
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
app.delete("/api/notes/:id", function (req, res) {
  notes.splice(req.params.id, 1);
  createNotes();
  console.log("Deleted note with id " + req.params.id);
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
