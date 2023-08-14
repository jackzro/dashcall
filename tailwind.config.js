module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1F8D7D",
        grey: "#FAFAFA",
      },
      screens: {
        phone: "320px",
        tablet: "640px",
        "max-tablet": { max: "640px" },
        desktop: "1024px",
        "max-desktop": { max: "1024px" },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1F8D7D",
          secondary: "#1C4B54",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "dark",
      "cupcake",
    ],
  },
  plugins: [
    require("daisyui"),
    require("autoprefixer"),
    {
      autoprefixer: {},
      tailwindcss: {},
    },
  ],
};
