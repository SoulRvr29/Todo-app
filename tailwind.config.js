/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bright-blue": "hsl(220, 98%, 61%)",
        "bkg-grad": "linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)",
        "light-vl-gray": "hsl(0, 0%, 98%)",
        "light-vl-grayish-blue": "hsl(236, 33%, 92%)",
        "light-l-grayish-blue": "hsl(233, 11%, 84%)",
        "light-d-grayish-blue": "hsl(236, 9%, 61%)",
        "light-vd-grayish-blue": "hsl(235, 19%, 35%)",
        "dark-vd-blue": "hsl(235, 21%, 11%)",
        "dark-vd-desaturated-blue": "hsl(235, 24%, 19%)",
        "dark-l-grayish-blue": "hsl(234, 39%, 85%)",
        "dark-l-grayish-blue-hover": "hsl(236, 33%, 92%)",
        "dark-d-grayish-blue": "hsl(234, 11%, 52%)",
        "dark-vd-grayish-blue": "hsl(233, 14%, 35%)",
        "dark-vd-grayish-blue": "hsl(237, 14%, 26%)",
      },
    },
  },
  plugins: [],
};
