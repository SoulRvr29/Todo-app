import { useState } from "react";

const Todo = ({ id, task, status, setStatus, deleteTask }) => {
  const [closeBtn, setCloseBtn] = useState(false);
  return (
    <div
      className="todo flex justify-between items-center gap-2 bg-light-vl-gray border-b border-light-l-grayish-blue p-4"
      onMouseEnter={() => setCloseBtn(true)}
      onMouseLeave={() => setCloseBtn(false)}
    >
      <button
        onClick={() => setStatus(id)}
        className={
          status
            ? "check-btn rounded-full border border-light-vl-grayish-blue"
            : "border hover:border-light-d-grayish-blue rounded-full border-light-vl-grayish-blue"
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
      <p
        className={
          "hover:cursor-pointer" +
          (status && " line-through text-light-l-grayish-blue")
        }
      >
        {task}
      </p>
      <button
        className={!closeBtn ? "invisible" : "visible"}
        onClick={() => deleteTask(id)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path
            fill="#494C6B"
            fillRule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Todo;
