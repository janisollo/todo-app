import { useState, useEffect } from "react";

const API_BASE = "http://localhost:3001";

function App() {
  // Define the state variables for todos, popupActive, and newTodo using the useState hook
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  // Use the useEffect hook to fetch the todos when the component mounts
  useEffect(() => {
    // Call the GetTodos function
    GetTodos();

    // Log the current value of the todos state variable
    console.log(todos);
  }, []);

  // Define the GetTodos function to fetch the todos from the API
  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => {
        // Set the todos state variable to the data returned from the API
        setTodos(data);

        // Log the data returned from the API
        console.log(data);
      })
      .catch((err) => console.error("Error:", err));
  };

  // Define the completeTodo function to mark a todo as completed
  const completeTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id).then((res) =>
      res.json()
    );

    // Update the todos state variable to mark the completed todo
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id == data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
  };

  // Define the deleteTodo function to delete a todo
  const deleteTodo = async (id) => {
    await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    });

    // Update the todos state variable to remove the deleted todo
    setTodos((todos) => todos.filter((todo) => todo._id !== id));
  };

  // Render the component
  return (
    <div className="App">
      <h1>Welcome Jani</h1>
      <h4>Your Tasks</h4>

      <div className="todos">
        {todos.map((todo) => (
          <div
            // Add the "is-complete" class to the todo element if it is completed
            className={"todo " + (todo.complete ? "is-complete" : "")}
            key={todo._id}
            onClick={() => completeTodo(todo._id)}
          >
            <div className="checkbox"></div>
            <div className="text">{todo.text}</div>
            <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
              x
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export the component
export default App;
