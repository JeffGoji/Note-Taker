const fs = require("fs");

//Installed NPM Dependencies:
const express = require("express");
const nodemon = require("nodemon");
const { text } = require("express");

//Express app:
const app = express();

//Simple middleware, means it stands between the request and the response:
app.use(express.urlencoded({ extended: true }));
//
app.use(express.json());

const notes = JSON.parse(fs.readFileSync(`${__dirname}/Develop/db/notes.json`));
// Routes
// =============================================================

//Defining a ROUTE with a variable, in this case the ID:
// app.get("/api/v1/notes/:id", (req, res) => {
//   //req.params assigns an id to our variable of :id above.
//   console.log(req.params);
//   //Convert the string to a number for the tour const below to work:
//   const id = req.params.id * 1;

//   //Loops through the array and gives access to the current object:
//   const notes = notes.find((el) => el.id === id);
//   //Sending an error if the requested ID doesn't exist:
//   if (id > notes.length) {
//     return res.status(404).json({
//       status: "fail",
//       message: "Invalid ID",
//     });
//   }

//   res.status(200).json({
//     status: "success",
//     data: {
//       tours,
//     },
//   });
// });

app.get("/api/notes", (req, res) => {
  res.status(200).json({
    status: "success",
    results: notes,
  });
});

//Post methods:

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  res.json(req.body);
  // const newId = notes[notes.length - 1].id + 1;
  // const newNote = Object.assign({ id: newId }, req.body);

  notes.push();

  fs.writeFile(
    `${__dirname}/Develop/db/notes.json`,
    JSON.stringify(notes),
    (err) => {
      res.status(201).json({
        status: "Success!",
        notes: {
          title,
          text,
        },
      });
    }
  );
});

//Post Method:
// app.post("/api/post", (req, res) => {
//   // console.log(req.body);

//   //create a unique id for each new object posted:
//   const newId = title[title.length - 1].id + 1;
//   //Creating a new tour:
//   const newNote = Object.assign({ id: newId }, req.body);

//   //Push tour into Tours array:
//   notes.push(newNote);

//   //persist new Tour into the file using the writeFile funciton:
//   fs.writeFile(
//     //Have to make sure you JSON.stringyfy (tours):
//     `${__dirname}/Develop/db/notes.json`,
//     JSON.stringify(notes),
//     (err) => {
//       //response sent is a 201.
//       res.status(201).json({
//         status: "Success!",
//         data: {
//           text: newNote,
//         },
//       });
//     }
//   );
// });

//Patch Request:
app.patch("/api/v1/notes/", (req, res) => {
  res.status(200).json({
    status: "sucess",
    data: {
      tour: {},
    },
  });
});

//Port information:
const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
