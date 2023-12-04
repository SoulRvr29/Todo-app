import { useState, useEffect } from "react";
import Header from "./components/Header";
import Todo from "./components/Todo";
import Form from "./components/Form";
import data from "./data/todo.json";
import Footer from "./components/Footer";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  // STATES
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

  // USE EFFECTS
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

  // FUNCTIONS
  const darkModeToggle = () => {
    setDarkMode(!darkMode);
    darkMode
      ? document.querySelector("html").classList.remove("dark")
      : document.querySelector("html").classList.add("dark");
  };

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

  const addTask = () => {
    let lastId = 0;
    tasks.forEach((task) => {
      if (task.id > lastId) lastId = task.id;
    });
    setTasks([...tasks, { id: lastId + 1, task: newTask, status: false }]);
    actualItemsLeft++;
    setItemsLeft(actualItemsLeft);
  };

  const editTask = (id, editedTask) => {
    setTasks(
      tasks.map((item) =>
        item.id == id ? { ...item, task: editedTask } : item
      )
    );
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

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedTasks = [...tasks];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedTask] = reorderedTasks.splice(sourceIndex, 1);
      reorderedTasks.splice(destinationIndex, 0, removedTask);
      return setTasks(reorderedTasks);
    }
  };

  return (
    <div className="w-screen h-screen grid">
      <picture className="fixed top-0 left-0 w-screen -z-10 overflow-hidden">
        <source
          media="(min-width: 376px )"
          srcSet={darkMode ? "bg-desktop-dark.jpg" : "bg-desktop-light.jpg"}
        />
        <source
          media="(max-width: 375px )"
          srcSet={darkMode ? "bg-mobile-dark.jpg" : "bg-mobile-light.jpg"}
        />
        <img
          className="max-h-[300px] w-full blur-xl scale-125"
          src="bg-desktop-dark.jpg"
          alt="bg image"
        />
      </picture>
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

      <div className="p-5 my-6 max-w-lg w-full mx-auto ">
        <Header darkMode={darkMode} darkModeToggle={darkModeToggle} />
        {/* <main> */}
        <main className=" drop-shadow-2xl mb-14 max-sm:mb-24">
          <Form
            addTask={addTask}
            setStatus={setStatus}
            setNewTask={setNewTask}
          />
          <DragDropContext onDragEnd={handleDragDrop}>
            <Droppable droppableId="ROOT" type="group">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map(
                    (task, index) =>
                      ((task.status == true && filter == "completed") ||
                        (task.status == false && filter == "active") ||
                        filter == "all") && (
                        <Draggable
                          draggableId={String(task.id)}
                          key={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => {
                            const tailwindClass = [
                              snapshot.isDragging
                                ? "draggable drop-shadow-[3px_3px_7px_rgba(0,0,0,0.2)] bg-white dark:bg-dark-vd-desaturated-blue2 "
                                : "draggable bg-light-vl-gray dark:bg-dark-vd-desaturated-blue" +
                                  (index == 0
                                    ? " rounded-t-md"
                                    : " rounded-none"),
                            ];
                            return (
                              <div
                                className={tailwindClass}
                                {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                              >
                                <Todo
                                  index={index}
                                  id={task.id}
                                  key={task.id}
                                  task={task.task}
                                  status={task.status}
                                  setStatus={setStatus}
                                  deleteTask={deleteTask}
                                  editTask={editTask}
                                />
                              </div>
                            );
                          }}
                        </Draggable>
                      )
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {todoLength == 0 && (
            <div className="text-center justify-between items-center gap-5 bg-light-vl-gray border-b border-light-l-grayish-blue p-4 max-sm:p-2 max-sm:gap-3 rounded-t-md dark:bg-dark-vd-desaturated-blue dark:border-dark-vd-grayish-blue ">
              {filter == "all" ? (
                <p className="max-sm:text-sm">List is empty</p>
              ) : filter == "active" ? (
                <p className="max-sm:text-sm">No active todos</p>
              ) : (
                <p className="max-sm:text-sm">No completed todos</p>
              )}
            </div>
          )}
          <footer className="bg-light-vl-gray dark:bg-dark-vd-desaturated-blue dark:text-dark-d-grayish-blue flex justify-between text-xs px-5 py-3 text-light-d-grayish-blue rounded-b-md">
            <p className="self-center">{itemsLeft} items left</p>
            <ul className="py-1 flex  gap-4 font-bold max-sm:absolute max-sm:mt-12 max-sm:w-full max-sm:bg-light-vl-gray max-sm:dark:bg-dark-vd-desaturated-blue max-sm:left-0 max-sm:justify-center max-sm:rounded-md max-sm:py-3 max-sm:text-[0.8rem] max-sm:gap-4">
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
          <p className=" text-center text-xs px-2 py-12 text-light-d-grayish-blue dark:text-light-vd-grayish-blue max-sm:mt-12">
            Drag and drop to reorder list
          </p>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
