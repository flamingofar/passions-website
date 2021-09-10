/** @format */

//DOM ELEMENTER
const produkter = document.querySelectorAll(".produkt");

produkter.forEach((produkt) => {
	produkt.addEventListener("click", () => {
		console.log("Hej");
	});
});
