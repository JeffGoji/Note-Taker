const fs = require("fs");
const path = require("path");
const notes = require("./Develop/db/db.json");

//Installed NPM Dependencies:
const express = require("express");
const nodemon = require("nodemon");

//Express app:
const app = express();

//This is needed for Heroku:
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

//Middleware:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

currentId = notes.length;

//API routes:
app.get("/api/notes", function (req, res) {
  return res.json(notes);
});

//HTML routes:
app.get("/notes", function (req, res) {
  res.sendFile(path.join(`${__dirname}/public/notes.html`));
});
app.get("*", function (req, res) {
  res.sendFile(path.join(`${__dirname}/public/index.html`));
});

// Access files in "public" folder

app.use(express.static("public"));

//POST methods:
app.post("/api/notes", function (req, res) {
  const newNote = req.body;

  newNote["id"] = currentId + 1;
  currentId++;
  console.log(newNote);

  //Push the new note:
  notes.push(newNote);

  //Rewrite note:
  rewriteNotes();
  return res.status(200).end();
});

//Delete function:
app.delete("/api/notes/:id", function (req, res) {
  res.send("Got a DELETE request at /api/notes/:id");

  let id = req.params.id;

  let idLess = notes.filter(function (less) {
    return less.id < id;
  });

  let idGreater = notes.filter(function (greater) {
    return greater.id > id;
  });

  notes = idLess.concat(idGreater);

  rewriteNotes();
});

//Write note function:
const rewriteNotes = (rewriteNotes) => {
  fs.writeFile(
    `${__dirname}/Develop/db/db.json`,
    JSON.stringify(notes),
    (err) => {
      if (err) {
        console.log("error");
        return console.log(err);
      }
    }
  );
};

//Port:
// const port = 3001;
// app.listen(port, () => {
//   console.log(`App running on port ${port}`);
// });
