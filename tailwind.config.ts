import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        dark: {
          primary: {
            a0: '#d90000',
            a10: '#ab1406',
            a20: '#7e1808',
            a30: '#551708',
            a40: '#2e1104',
          },
          menu:{
            y10: '#fabd15',
          },
          accent: {
            a0: '#00d9d9',
            a10: '#1ca9a9',
            a20: '#217c7c',
            a30: '#1e5252',
            a40: '#162b2b',
          },
          neutral: {
            a0: '#868585',
            a10: '#6b6969',
            a20: '#504e4e',
            a30: '#373535',
            a40: '#201e1e',
            a50: '#040000',
          },
        },
        light: {
          primary: {
            100: '#ffdad4', // Lightest tone
            200: '#ffc4b8',
            300: '#ffad9b',
            400: '#ff977e',
            500: '#ff8162',
            600: '#ff6b46', // Darkest tone
          },
          neutral: {
            100: '#ffffff', // Lightest tone
            200: '#f7f7f7',
            300: '#efefef',
            400: '#e7e7e7',
            500: '#dfdfdf',
            600: '#d7d7d7', // Darkest tone
          },
        },
        alert:{
          danger: {
            100: '#f8d7da',
            200: '#f1b0b7',
            300: '#ea8993',
            400: '#e46370',
            500: '#dc3d4d',
            600: '#b41c2b', // Base color
          },
          success: {
            100: '#d6f5e3',
            200: '#adecc8',
            300: '#85e4ad',
            400: '#5cd992',
            500: '#34ce77',
            600: '#009f42', // Base color
          },
          warning: {
            100: '#fff3cd',
            200: '#ffe49a',
            300: '#ffd667',
            400: '#ffc834',
            500: '#ffba00',
            600: '#cc8800', // Base color
          },
          info: {
            100: '#dbeeff',
            200: '#b7ddff',
            300: '#92cbff',
            400: '#6dbaff',
            500: '#47a8ff',
            600: '#388cfa', // Base color
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
