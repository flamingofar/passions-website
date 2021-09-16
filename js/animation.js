/** @format */
const preLoader = document.querySelector(".preloader");
const svgLogo = preLoader.querySelector(".svg_logo");

window.addEventListener("load", () => {
	svgLogo.addEventListener("animationend", () => {
		preLoader.classList.add("no_preloader");
		console.log(preLoader);
	});
});
