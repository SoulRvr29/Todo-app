const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-screen text-center font-bold text-base max-sm:text-xs text-light-vd-grayish-blue p-4 max-sm:p-2 bg-Very-light-gray border-t border-light-l-grayish-blue bg-light-vl-gray dark:bg-dark-vd-desaturated-blue dark:border-dark-vd-grayish-blue dark:text-dark-d-grayish-blue">
      Challenge by
      <a
        className="text-bright-blue ml-2 hover:underline"
        href="https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW"
        target="_blank"
      >
        Frontend Mentor
      </a>
      . Coded by
      <a
        className="text-bright-blue ml-2 hover:underline"
        href="https://www.frontendmentor.io/profile/SoulRvr29"
      >
        Paweł Chudecki
      </a>
      .
    </footer>
  );
};

export default Footer;
