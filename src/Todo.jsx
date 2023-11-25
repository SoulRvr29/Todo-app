import { useState } from "react";

const Todo = ({ id, task, status, setStatus, deleteTask }) => {
  const [closeBtn, setCloseBtn] = useState(false);
  return (
    <div
      className={
        "todo flex justify-between items-center gap-5 bg-light-vl-gray dark:bg-dark-vd-desaturated-blue dark:border-dark-vd-grayish-blue border-b border-light-l-grayish-blue p-4 max-sm:p-2 max-sm:gap-3  " +
        (id == 0 ? " rounded-t-md" : " rounded-none")
      }
      onMouseEnter={() => setCloseBtn(true)}
      onMouseLeave={() => setCloseBtn(false)}
    >
      <button
        onClick={() => setStatus(id)}
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
      <p
        className={
          "hover:cursor-pointer w-full max-sm:text-xs " +
          (status &&
            " line-through text-light-l-grayish-blue dark:text-dark-d-grayish-blue")
        }
      >
        {task}
      </p>
      <button
        className={!closeBtn ? "invisible max-sm:visible " : "visible "}
        onClick={() => deleteTask(id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          className="max-sm:scale-75"
        >
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
