/** @format */

// RestDB detaljer
const db = "https://cocktails-2d4e.restdb.io/rest/cocktails";
const APIKey = "6138eab743cedb6d1f97ee7b";

let settings = {
	async: true,
	crossDomain: true,
	url: db,
	method: "GET",
	headers: {
		"content-type": "application/json",
		"x-apikey": APIKey,
		"cache-control": "no-cache",
	},
};

//DOM ELEMENTER
const produkter = document.querySelectorAll(".produkt");
const popUp = document.querySelector(".pop-up");
const lukBtn = document.querySelector(".luk");
const readMore = document.querySelector(".read-more");
const recipe = document.querySelector(".recipe");

// Variabler
const images = "../assets/images/cocktails/";

window.addEventListener("DOMContentLoaded", start);

function start() {
	// Load JSON
	loadJSON();
}

function showSinglePage() {
	console.log("Singlepage vises!");
}
function showRecipe() {
	console.log("Opskrift vises!");
}

// Rest API Call
async function loadJSON() {
	const JSONData = await fetch(db, settings);

	cocktails = await JSONData.json();
	console.log(cocktails);
	console.log(cocktails[0].name);

	vis(cocktails);
}

function vis(json) {
	const cocktailTemplate = document.querySelector("template");
	const container = document.querySelector(".produkt_visning");

	json.forEach((el) => {
		let klon = cocktailTemplate.cloneNode(true).content;
		klon.querySelector(".name").textContent = el.name;

		klon.querySelector("img").src = `${images}${el.billede_navn}.jpg`;
		// klon.querySelector(".kort").textContent = el.kortbeskrivelse;
		// klon.querySelector("img").src = `${images}${el.billednavn}-md.jpg`;
		// klon.querySelector(".country").textContent = `Land: ${el.oprindelsesregion}`;
		// klon.querySelector(".pris-tag").textContent = `${el.pris} kr.`;

		// Vis Pop-up
		klon.querySelector(".produkt").addEventListener("click", () => {
			popUpHandler(el);
		});

		container.appendChild(klon);
	});
}

function popUpHandler(cocktail) {
	console.log(cocktail);
	popUp.classList.remove("hide");
	// Luk-knap funktion
	lukBtn.addEventListener("click", () => {
		popUp.classList.add("hide");
	});

	// Læs mere knap funktion
	readMore.addEventListener("click", showSinglePage);
	// Opskrift knap funktion
	recipe.addEventListener("click", showRecipe);

	popUp.querySelector("img").src = `${images}${cocktail.billede_navn}.jpg`;
}
