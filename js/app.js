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
const recipe = document.querySelector(".recipe");
const btns = document.querySelectorAll(".filter_btn_container button");

// Variabler
const images = "../assets/images/cocktails/";
let filter = "alle";

window.addEventListener("DOMContentLoaded", start);

function start() {
	// Load JSON
	loadJSON();

	btns.forEach((btn) => {
		btn.addEventListener("click", filtrerCocktails);
	});
}

// Rest API Call
async function loadJSON() {
	const JSONData = await fetch(db, settings);

	cocktails = await JSONData.json();
	console.log(cocktails);

	vis(cocktails);
}

function vis(json) {
	const cocktailTemplate = document.querySelector("template");
	const container = document.querySelector(".produkt_visning");
	container.textContent = "";

	json.forEach((el) => {
		let klon = cocktailTemplate.cloneNode(true).content;
		klon.querySelector(".name").textContent = el.name;

		if (filter == el.alkohol_type || filter == "alle") {
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
		}
	});
}

// Filtrering
function filtrerCocktails() {
	filter = this.dataset.alkohol;
	document.querySelector(".active_filter").classList.remove("active_filter");
	this.classList.add("active_filter");

	// let firstLetter = filter.charAt(0).toUpperCase() + filter.slice(1);

	// document.querySelector("h2").textContent = firstLetter;

	vis(cocktails);
}

function popUpHandler(cocktail) {
	popUp.classList.remove("hide");
	// Luk-knap funktion
	lukBtn.addEventListener("click", () => {
		popUp.classList.add("hide");
	});

	// Opskrift knap funktion
	recipe.addEventListener("click", () => {
		showSinglePage(cocktail);
	});

	popUp.querySelector("img").src = `${images}${cocktail.billede_navn}.jpg`;
	popUp.addEventListener("click", (e) => {
		if (e.explicitOriginalTarget.classList == "pop-up") {
			popUp.classList.add("hide");
		}
	});
}

function showSinglePage(cocktail) {
	location.href = `_single-page.html?id=${cocktail._id}`;
}
//613b0759d943be7d000b252f
