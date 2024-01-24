import { observer } from "mobx-react-lite";
import { store } from "./store/index";

import { TodoItem } from "./components/TodoItem";
import { Adderator } from "./components/Adderator";

const App = observer(() => {
  return (
    <div style={{ width: "700px", margin: "0 auto", padding: "30px" }}>
      <Adderator />
      <div
        style={{
          padding: "15px",
          borderRadius: "10px",
          border: "2px solid grey",
          backgroundColor: "#CCCC",
        }}>
        {store.todos
          .getAll()
          .reverse()
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
});

export default App;
