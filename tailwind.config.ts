import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif']
      },
      colors: {
        'white-primary': '#fdfdfd',
        'white-secondary': '#8d9693',
        'black-primary': '#000000',
        'black-secondary': '#777777',
      },
    },
  },
  plugins: [],
}
export default config
