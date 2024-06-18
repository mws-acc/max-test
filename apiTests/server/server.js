// import the libraries
const express = require("express");
const cors = require("cors");
// create the express app object
const app = express();
// create PORT
const PORT = process.env.PORT || 3000;

// create middleware that allows us to read the body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// allow any browser to access our API
app.use(cors());

// our data
let bucketListArray = [
  { id: 1, description: "Backpack New Zealand", isComplete: false },
  { id: 2, description: "Train ride", isComplete: false },
  { id: 3, description: "Visit Canada", isComplete: false },
];

// root route
app.get("/", function (req, res) {
  res.send("You have reached the BucketList API running on port " + PORT);
});

// READ
app.get("/bucket", function (req, res) {
  res.json(bucketListArray);
});

// CREATE
app.post("/bucket", function (req, res) {
  console.log("The data coming to the server is ", req.body);

  // STEPS:
  // 0. Check for valid input
  if (!req.body.description || typeof req.body.description !== "string") {
    res.status(400).json({
      error: "Need a valid description as a string!!",
    });
  }
  // 1. get the body
  // Q. What data would you send to this route?
  let newItem = {
    id: Date.now(),
    description: req.body.description,
    isComplete: false,
  };
  // 2. attach newItem to the array
  bucketListArray.push(newItem);

  // 3. send the array back to the client
  res.status(201).json(newItem);
});

// UPDATE
app.put("/bucket/:id", function (req, res) {
  // 1. find the id
  console.log(typeof req.params.id);
  let newId = req.params.id - 0;

  // 2. find the object
  let foundItem = bucketListArray.find(function (itemObj) {
    return itemObj.id === newId;
  });

  // Happy Case
  if (foundItem) {
    // 3. change isComplete
    foundItem.isComplete = !foundItem.isComplete;
    // 4. send the item back
    res.json(foundItem);
  } else {
    res.status(404).json({ error: "Id does not exist for updating" });
  }
});

// DELETE
app.delete("/bucket/:id", (request, response) => {
  //parseInt will convert to a number
  const id = parseInt(request.params.id);
  //filter out the item to delete. filter created a copy and then we assigned it back to the array
  bucketListArray = bucketListArray.filter(function (item) {
    //every function should return something
    return item.id != id;
  });
  //send response back
  response.json({ message: "item deleted" });
});

// Listener
const server = app.listen(PORT, () =>
  console.log(`App listening on PORT: ${PORT}`)
);

module.exports = server; // Export the Express app instance
