/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./{test.html,test.css}"],
	theme: {
		extend: {},
	},
	plugins: [
		{
			tailwindcss: {},
			autoprefixer: {},
		},
	],
};
