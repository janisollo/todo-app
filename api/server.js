// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Create a new Express app
const app = express();

// Enable JSON parsing middleware for incoming requests
app.use(express.json());

// Enable CORS middleware to allow cross-origin requests
app.use(cors());

// Connect to MongoDB using Mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch(console.error);

// Import the Todo model
const Todo = require("./models/Todo");

// Define a route to retrieve all todos from the database
app.get("/todos", async (req, res) => {
  // Find all todos using the Todo model
  const todos = await Todo.find();

  // Send the todos as a JSON response
  res.json(todos);
});

// Define a route to create a new todo in the database
app.post("/todo/new", (req, res) => {
  // Create a new Todo object with the text from the request body
  const todo = new Todo({
    text: req.body.text,
  });

  // Save the new todo to the database
  todo.save();

  // Send the new todo as a JSON response
  res.json(todo);
});

// app.delete("/todo/delete/id:", async (req, res) => {
//   const result = await Todo.findByIdAndDelete(req.params.id);

//   res.json(result);
// });

// Define a route to handle DELETE requests to the '/todo/delete/:id' endpoint

app.delete("/todo/delete/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  return res.json({ message: "Todo deleted successfully" });
});

// Start the server and listen for incoming requests
app.listen(3001, () => console.log("Server started on port 3001"));
