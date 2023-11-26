import { useState, useEffect } from "react";
import Header from "./components/Header";
import Todo from "./components/Todo";
import Form from "./components/Form";
import data from "./data/todo.json";
import Footer from "./components/Footer";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("todoData")) || data
  );

  const [todoLength, setTodoLength] = useState(
    document.querySelectorAll(".todo").length
  );
  const [newTask, setNewTask] = useState("");
  const [itemsLeft, setItemsLeft] = useState(0);
  const [filter, setFilter] = useState("all");
  let actualItemsLeft = itemsLeft;

  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("todoDarkMode")) || false
  );
  const darkModeToggle = () => {
    setDarkMode(!darkMode);
    darkMode
      ? document.querySelector("html").classList.remove("dark")
      : document.querySelector("html").classList.add("dark");
  };

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(tasks));
    localStorage.setItem("todoDarkMode", JSON.stringify(darkMode));
    setTodoLength(document.querySelectorAll(".todo").length);
  }, [tasks, darkMode, filter]);

  useEffect(() => {
    let sum = 0;
    tasks.forEach((task) => {
      if (task.status == false) sum++;
    });
    setItemsLeft(sum);
    !darkMode
      ? document.querySelector("html").classList.remove("dark")
      : document.querySelector("html").classList.add("dark");
  }, []);

  const setStatus = (id, index) => {
    if (tasks[index].status == true) actualItemsLeft++;
    else actualItemsLeft--;
    setTasks(
      tasks.map((task) =>
        task.id == id ? { ...task, status: !task.status } : task
      )
    );
    setItemsLeft(actualItemsLeft);
  };

  const deleteTask = (id, index) => {
    setTasks(tasks.filter((task) => task.id != id));
    if (tasks[index].status == false) {
      actualItemsLeft--;
      setItemsLeft(actualItemsLeft);
    }
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
    actualItemsLeft++;
    setItemsLeft(actualItemsLeft);
  };

  return (
    <div className="w-screen h-screen grid ">
      <picture className="fixed top-0 justify-self-center min-w-max -z-10">
        <source
          media="(min-width: 376px )"
          srcSet={darkMode ? "bg-desktop-dark.jpg" : "bg-desktop-light.jpg"}
        />
        <source
          media="(max-width: 375px )"
          srcSet={darkMode ? "bg-mobile-dark.jpg" : "bg-mobile-light.jpg"}
        />
        <img src="bg-desktop-dark.jpg" alt="bg image" />
      </picture>

      <div className="p-4 my-6 max-w-lg w-full mx-auto ">
        <Header darkMode={darkMode} darkModeToggle={darkModeToggle} />
        <main className="drop-shadow-2xl mb-14 max-sm:mb-24">
          <Form
            addTask={addTask}
            setStatus={setStatus}
            setNewTask={setNewTask}
          />
          {tasks.map(
            (task, index) =>
              ((task.status == true && filter == "completed") ||
                (task.status == false && filter == "active") ||
                filter == "all") && (
                <Todo
                  index={index}
                  id={task.id}
                  key={task.id}
                  task={task.task}
                  status={task.status}
                  setStatus={setStatus}
                  deleteTask={deleteTask}
                />
              )
          )}
          {todoLength == 0 && (
            <div className="text-center justify-between items-center gap-5 bg-light-vl-gray border-b border-light-l-grayish-blue p-4 max-sm:p-2 max-sm:gap-3 rounded-t-md dark:bg-dark-vd-desaturated-blue dark:border-dark-vd-grayish-blue ">
              {filter == "all" ? (
                <p>List is empty</p>
              ) : filter == "active" ? (
                <p>No active todo</p>
              ) : (
                <p>No completed todo</p>
              )}
            </div>
          )}
          <footer className="bg-light-vl-gray dark:bg-dark-vd-desaturated-blue dark:text-dark-d-grayish-blue flex justify-between text-xs px-4 py-3 text-light-d-grayish-blue rounded-b-md">
            <span>{itemsLeft} items left</span>
            <ul className=" flex gap-2 font-bold max-sm:absolute max-sm:-bottom-14 max-sm:w-full max-sm:bg-light-vl-gray max-sm:dark:bg-dark-vd-desaturated-blue max-sm:left-0 max-sm:justify-center max-sm:rounded-md max-sm:py-3 max-sm:text-sm max-sm:gap-4">
              <li
                className={
                  "hover:cursor-pointer hover:text-light-vd-grayish-blue dark:hover:text-dark-l-grayish-blue-hover " +
                  (filter == "all" && " text-bright-blue")
                }
                onClick={() => {
                  setFilter("all");
                }}
              >
                All
              </li>
              <li
                className={
                  "hover:cursor-pointer hover:text-light-vd-grayish-blue dark:hover:text-dark-l-grayish-blue-hover " +
                  (filter == "active" && " text-bright-blue")
                }
                onClick={() => {
                  setFilter("active");
                }}
              >
                Active
              </li>
              <li
                className={
                  "hover:cursor-pointer hover:text-light-vd-grayish-blue dark:hover:text-dark-l-grayish-blue-hover " +
                  (filter == "completed" && " text-bright-blue")
                }
                onClick={() => {
                  setFilter("completed");
                }}
              >
                Completed
              </li>
            </ul>
            <button
              className="hover:text-light-vd-grayish-blue dark:hover:text-dark-l-grayish-blue-hover "
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
