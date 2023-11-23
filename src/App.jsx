import { useState, useEffect } from "react";
import Header from "./Header";
import Todo from "./Todo";
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

  const filterChange = (type) => {};

  return (
    <div className="p-4 mt-6 max-w-lg mx-auto">
      <Header />
      <main>
        <form
          className="flex w-full items-center gap-5 bg-light-vl-gray border-b border-light-l-grayish-blue p-4 mb-5 rounded-md"
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
        >
          <button
            onClick={() => setStatus(id)}
            className="border hover:border-light-d-grayish-blue rounded-full border-light-vl-grayish-blue"
          >
            <svg
              className={!status ? "invisible" : "visible"}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-7 -8 24 24"
              height="1.5em"
            >
              <path
                fill="none"
                stroke="white"
                strokeWidth="2"
                d="M1 4.304L3.696 7l6-6"
              />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Create a new todo..."
            className="w-full bg-light-vl-gray caret-bright-blue"
            onChange={(e) => setNewTask(e.target.value)}
          />
        </form>
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
