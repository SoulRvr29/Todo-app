import { useState } from "react";
import form from "./Form";

const Todo = ({ id, index, task, status, setStatus, deleteTask, editTask }) => {
  const [closeBtn, setCloseBtn] = useState(false);
  const [editMode, setEditMode] = useState(false);

  return (
    <div
      className={
        "todo flex justify-between items-center gap-5  dark:border-dark-vd-grayish-blue border-b border-light-l-grayish-blue p-4 max-sm:p-[11px] max-sm:gap-2 "
      }
      onMouseEnter={() => setCloseBtn(true)}
      onMouseLeave={() => setCloseBtn(false)}
    >
      <button
        onClick={() => setStatus(id, index)}
        className={
          status
            ? "check-btn rounded-full border border-light-vl-grayish-blue dark:border-dark-vd-grayish-blue  max-sm:scale-75"
            : "border dark:border-dark-vd-grayish-blue hover:border-light-d-grayish-blue dark:hover:border-dark-d-grayish-blue rounded-full border-light-vl-grayish-blue max-sm:scale-75"
        }
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

      {!editMode ? (
        <p
          className={
            "hover:cursor-grab w-full max-sm:text-xs px-1 " +
            (status &&
              " line-through text-light-l-grayish-blue dark:text-dark-d-grayish-blue")
          }
        >
          {task}
        </p>
      ) : (
        <form
          onSubmit={() => setEditMode(false)}
          className="w-full bg-light-vl-gray dark:bg-dark-vd-desaturated-blue caret-bright-blue max-sm:text-xs border border-light-l-grayish-blue px-1"
        >
          <input
            className="w-full bg-light-vl-gray dark:bg-dark-vd-desaturated-blue caret-bright-blue max-sm:text-xs"
            type="text"
            value={task}
            autoFocus={true}
            onBlur={() => setEditMode(false)}
            onChange={(e) => editTask(id, e.target.value)}
          />
        </form>
      )}
      <button
        title="edit"
        className={!closeBtn ? "invisible max-sm:visible " : "visible "}
        onClick={() => setEditMode(!editMode)}
      >
        <svg
          className="max-sm:scale-75 dark:fill-dark-vd-grayish-blue fill-light-vd-grayish-blue hover:fill-bright-blue dark:hover:fill-bright-blue"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fillRule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>
      </button>
      <button
        className={!closeBtn ? "invisible max-sm:visible " : "visible "}
        title="delete"
        onClick={() => deleteTask(id, index)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          className="max-sm:scale-75 dark:fill-dark-vd-grayish-blue fill-light-vd-grayish-blue hover:fill-bright-blue dark:hover:fill-bright-blue"
        >
          <path
            fillRule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Todo;
