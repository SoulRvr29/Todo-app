const Header = () => {
  return (
    <header className="flex justify-between my-4">
      <h1 className="text-light-vl-gray uppercase tracking-[10px] font-bold text-3xl max-sm:text-2xl">
        todo
      </h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        className="max-sm:scale-75"
      >
        <path
          fill="#FFF"
          fillRule="evenodd"
          d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
        />
      </svg>
    </header>
  );
};

export default Header;