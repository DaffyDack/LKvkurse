/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
		extend: {
			colors: {
				'greenIVA': '#009373',
			},
			screens: {
				midmd: "880px",
				'3xl': '16000px'
			}
		},
	},
  plugins: [],
}

