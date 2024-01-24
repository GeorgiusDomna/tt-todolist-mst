import { Instance, applySnapshot, flow, t } from "mobx-state-tree";

const TodoModel = t
  .model({
    id: t.integer,
    title: t.string,
    completed: t.boolean,
  })
  .actions((self) => ({
    toggleStatus() {
      self.completed = !self.completed;
    },
  }));

export type TodoType = Instance<typeof TodoModel>;

const todosStore = t
  .model({ rawData: t.map(TodoModel) })
  .actions((self) => ({
    load: flow(function* todosLoader() {
      try {
        const loadedTodos = yield fetch(
          "https://jsonplaceholder.typicode.com/todos"
        )
          .then((response) => response.json())
          .then((todosArray) =>
            (todosArray as Array<TodoType>).reduce((a, c) => {
              a[c.id] = c;
              return a;
            }, {} as { [key: string]: {} })
          );
        applySnapshot(self, { rawData: loadedTodos });
      } catch (e) {
        console.error(e);
        alert(e);
      }
    }),
    add(title: string, completed: boolean = false) {
      const newId = Date.now();
      self.rawData.set(
        newId,
        TodoModel.create({ id: newId, title, completed })
      );
    },
    delete(id: number) {
      self.rawData.delete(id.toString());
    },
  }))
  .views((self) => ({
    getAll() {
      return Array.from(self.rawData.values());
    },
  }));

  const Store = t.model({
    todos: t.optional(todosStore, {}),
  });
  
  const store = Store.create();
  store.todos.load();
  export { store };
  