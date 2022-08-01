import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    setTodos([
      ...todos,
      {
        text: inputValue,
        id: uuidv4(),
      },
    ]);

    setInputValue("");
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const localData = localStorage.getItem("TODO_APP");
    if (localData !== null) setTodos(JSON.parse(localData));
  }, []);

  useEffect(() => {
    localStorage.setItem("TODO_APP", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={addTodo}>
          <input
            autoFocus
            type="text"
            placeholder="Add a task..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button type="submit">Add</button>
        </form>
        {todos.map((todo) => (
          <div key={todo.id} className="todo">
            <p>{todo.text}</p>
            <i
              onClick={() => removeTodo(todo.id)}
              className="fa-regular fa-trash-can"
            ></i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
