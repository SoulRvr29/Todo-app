import { useState, useEffect } from "react";
import Header from "./Header";
import Todo from "./Todo";
import Form from "./Form";
import data from "./data/todo.json";
import Footer from "./Footer";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("todoData")) || data
  );
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
    localStorage.setItem("todoData", JSON.stringify(tasks));
  }, [tasks]);

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
    let lastId = 0;
    tasks.forEach((task) => {
      if (task.id > lastId) lastId = task.id;
    });
    setTasks([...tasks, { id: lastId + 1, task: newTask, status: false }]);
  };

  return (
    <div className="w-screen h-screen grid ">
      <img
        src="bg-desktop-light.jpg"
        alt="background image"
        className="fixed top-0 justify-self-center min-w-max -z-10"
      />
      <div className="p-4 my-6 max-w-lg w-full mx-auto">
        <Header />
        <main className="drop-shadow-2xl mb-14 max-sm:mb-24">
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
          {!tasks.length && (
            <div className="text-center justify-between items-center gap-5 bg-light-vl-gray border-b border-light-l-grayish-blue p-4 max-sm:p-2 max-sm:gap-3 rounded-t-md  ">
              List is empty.
            </div>
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
      <Footer />
    </div>
  );
}

export default App;
