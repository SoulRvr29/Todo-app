import { useState, useEffect } from "react";
import Header from "./Header";
import Todo from "./Todo";
import Form from "./Form";
import data from "./data/todo.json";

function App() {
  const [tasks, setTasks] = useState(data);
  const [newTask, setNewTask] = useState("");
  const [itemsLeft, setItemsLeft] = useState(0);
  const [filter, setFilter] = useState("all");

  const updateLeftCounter = () => {
    let sum = 0;
    tasks.forEach((task) => {
      if (task.status == false) sum++;
    });
    setItemsLeft(sum);
  };

  useEffect(() => {
    updateLeftCounter();
  }, []);

  const setStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, status: !task.status } : task
      )
    );
    updateLeftCounter();
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  const addTask = () => {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, task: newTask, status: false },
    ]);
  };

  const filterChange = (type) => {
    if (type == "active") {
      setTasks(
        tasks.map((task) =>
          task.status == false
            ? { ...task, visibility: false }
            : { ...task, visibility: true }
        )
      );
    } else if (type == "completed") {
      setTasks(
        tasks.map((task) =>
          task.status == true
            ? { ...task, visibility: false }
            : { ...task, visibility: true }
        )
      );
    } else
      setTasks(
        tasks.map((task) =>
          task.visibility == false ? { ...task, visibility: true } : task
        )
      );
  };
  console.log(tasks);
  return (
    <div className="p-4 mt-6 max-w-lg mx-auto">
      <Header />
      <main>
        <Form addTask={addTask} setStatus={setStatus} setNewTask={setNewTask} />
        {tasks.map(
          (task) =>
            // task.visibility == true && (
            ((task.status == true && filter == "completed") ||
              (task.status == false && filter == "active") ||
              filter == "all") && (
              <Todo
                id={task.id}
                key={task.id}
                task={task.task}
                status={task.status}
                setStatus={setStatus}
                deleteTask={deleteTask}
              />
            )
        )}
        <footer className="bg-light-vl-gray flex justify-between text-xs px-4 py-3 text-light-d-grayish-blue rounded-b-md">
          <span>{itemsLeft} items left</span>
          <ul className="flex gap-2 font-bold">
            <li
              className={
                "hover:cursor-pointer hover:text-light-vd-grayish-blue" +
                (filter == "all" && " text-bright-blue")
              }
              onClick={() => {
                setFilter("all");
                filterChange("all");
              }}
            >
              All
            </li>
            <li
              className={
                "hover:cursor-pointer hover:text-light-vd-grayish-blue" +
                (filter == "active" && " text-bright-blue")
              }
              onClick={() => {
                setFilter("active");
                filterChange("active");
              }}
            >
              Active
            </li>
            <li
              className={
                "hover:cursor-pointer hover:text-light-vd-grayish-blue" +
                (filter == "completed" && " text-bright-blue")
              }
              onClick={() => {
                setFilter("completed");
                filterChange("completed");
              }}
            >
              Completed
            </li>
          </ul>
          <button className="hover:text-light-vd-grayish-blue">
            Clear Completed
          </button>
        </footer>
      </main>
    </div>
  );
}

export default App;
