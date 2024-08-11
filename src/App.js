import React, { useState } from "react";
import "./index.css";
import { useLocalStorage } from "./useLOcalStorage";
import addIcon from "./add-icon.svg";
import deleteIcon from "./delete-icon.svg";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [allTodos, setAllTodos] = useLocalStorage("todos", [
    {
      id: 1,
      name: "write your todo ...",
      isCompleted: false,
    },
  ]);

  const handleSumbit = (e) => {
    e.preventDefault();
    if (inputValue === "") {
      alert("Please Write Somthing");
    } else {
      setAllTodos([
        ...allTodos,
        { id: Date.now(), name: inputValue, isCompleted: false },
      ]);
      setInputValue("");
    }
  };

  const remove = (id) => {
    setAllTodos(allTodos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (tid) => {
    setAllTodos(
      allTodos.map((todo) => {
        if (todo.id === tid) {
          return { ...todo, isCompleted: !todo.isCompleted };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <>
      <div className="contaienr">
        <div className="input-filed">
          <h2>TODO LIST</h2>
          <form onSubmit={handleSumbit}>
            <input
              placeholder="write todo..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <img
              src={addIcon}
              style={{ width: "30px" }}
              onClick={handleSumbit}
            />
          </form>
        </div>
        <ul className="show-todos">
          {allTodos.map((todo) => {
            let checked = todo.isCompleted;
            return (
              <li
                key={todo.id}
                className={!todo.isCompleted ? "single-todo" : "single-todo-2"}
              >
                <div className="input-check">
                  <input
                    checked={checked}
                    type="checkbox"
                    onChange={() => toggleCompleted(todo.id)}
                  />
                  <span>{todo.name}</span>
                </div>
                <img
                  src={deleteIcon}
                  style={{ width: "35px" }}
                  onClick={() => remove(todo.id)}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
