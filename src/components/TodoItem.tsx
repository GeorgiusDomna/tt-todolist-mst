import { observer } from "mobx-react-lite";
import { store, TodoType } from "../store";

type TodoItemProps = { todo: TodoType };

export const TodoItem = observer(({ todo }: TodoItemProps) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          columnGap: "15px",
          padding: "10px",
          marginBottom: "5px",
          borderRadius: "5px",
          border: "1px solid grey",
          backgroundColor: "#CCCCCC",
        }}
      >
        <input
          style={{cursor: "pointer"}}
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            todo.toggleStatus();
          }}
        />
        <span style={{ flexGrow: 1, fontSize: 18}}>{todo.title}</span>
        <button
          style={{ cursor: "pointer", color: "red", padding: "2px 5px" }}
          onClick={() => {
            store.todos.delete(todo.id);
          }}
        >
          delete
        </button>
      </div>
    </>
  );
});
