import { useState } from "react";
import { store } from "../store";

export const Adderator = () => {
  const [newTodo, setNewTodo] = useState<string>("");

  const addTodo = () => {
    if (newTodo) {
      store.todos.add(newTodo);
      setNewTodo("");
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          padding: "10px",
          backgroundColor: "grey",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      >
        <input
          style={{ width: "80%", marginRight: "5px" }}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          style={{ width: "20%", padding: "5px", cursor: "pointer"}}
          onClick={addTodo}>
          Add Todo
        </button>
      </div>
    </>
  );
};
