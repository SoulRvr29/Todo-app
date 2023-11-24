const form = ({ addTask, setStatus, setNewTask }) => {
  return (
    <form
      className="flex w-full items-center gap-5 bg-light-vl-gray border-b border-light-l-grayish-blue p-4 mb-5 rounded-md"
      onSubmit={(e) => {
        e.preventDefault();
        addTask();
        e.target.reset();
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
  );
};

export default form;
