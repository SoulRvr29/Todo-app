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

  const deleteCompleted = () => {
    setTasks(tasks.filter((task) => task.status == false));
  };

  const addTask = () => {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, task: newTask, status: false },
    ]);
  };

  return (
    <div className="w-screen h-screen grid ">
      <img
        src="../public/bg-desktop-light.jpg"
        alt="background image"
        className="fixed top-0 justify-self-center min-w-max -z-10"
      />
      <div className="p-4 my-6 max-w-lg w-full mx-auto">
        <Header />
        <main className="drop-shadow-2xl">
          <Form
            addTask={addTask}
            setStatus={setStatus}
            setNewTask={setNewTask}
          />
          {tasks.map(
            (task) =>
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
            <ul className=" flex gap-2 font-bold max-sm:absolute max-sm:-bottom-14 max-sm:w-full max-sm:bg-light-vl-gray max-sm:left-0 max-sm:justify-center max-sm:rounded-md max-sm:py-3 max-sm:text-sm max-sm:gap-4">
              <li
                className={
                  "hover:cursor-pointer hover:text-light-vd-grayish-blue " +
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
                  "hover:cursor-pointer hover:text-light-vd-grayish-blue " +
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
                  "hover:cursor-pointer hover:text-light-vd-grayish-blue " +
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
            <button
              className="hover:text-light-vd-grayish-blue "
              onClick={() => deleteCompleted()}
            >
              Clear Completed
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
