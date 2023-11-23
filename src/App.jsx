import { useState } from "react";
import Header from "./Header";
import Todo from "./Todo";
import data from "./data/todo.json";

function App() {
  const [tasks, setTasks] = useState(data);
  const setStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, status: !task.status } : task
      )
    );
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  return (
    <div className="p-4 mt-6 max-w-lg mx-auto">
      <Header />
      <main>
        {tasks.map((task) => (
          <Todo
            id={task.id}
            key={task.id}
            task={task.task}
            status={task.status}
            setStatus={setStatus}
            deleteTask={deleteTask}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
