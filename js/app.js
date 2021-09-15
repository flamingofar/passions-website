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

const alleCheck = document.querySelector("check_1");
const vodkaCheck = document.querySelector(".check_2");
const romCheck = document.querySelector(".check_3");
const ginCheck = document.querySelector(".check_4");
const whiskeyCheck = document.querySelector(".check_5");
const tequilaCheck = document.querySelector(".check_6");
const campariCheck = document.querySelector(".check_7");
const conacCheck = document.querySelector(".check_8");
const checkBox = document.querySelectorAll('input[type="checkbox"]');

// Variabler
let cocktails;
const images = "../assets/images/cocktails/";
let filter = "alle";

let romBool, ginBool, whiskeyBool, tequilaBool, campariBool;
vodkaBool = true;
romBool = false;
ginBool = false;
whiskeyBool = false;
tequilaBool = false;
campariBool = false;
conacBool = false;

vodkaCheck.checked = vodkaBool;
romCheck.checked = romBool;
ginCheck.checked = ginBool;
whiskeyCheck.checked = whiskeyBool;
tequilaCheck.checked = tequilaBool;
campariCheck.checked = campariBool;
conacCheck.checked = conacBool;

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

	vis();
}

function vis() {
	checkBox.forEach((el) => {
		el.addEventListener("click", checkBoxHandler);
	});

	vodkaBool = vodkaCheck.checked;
	romBool = romCheck.checked;
	ginBool = ginCheck.checked;
	whiskeyBool = whiskeyCheck.checked;
	tequilaBool = tequilaCheck.checked;
	campariBool = campariCheck.checked;
	conacBool = conacCheck.checked;

	const cocktailTemplate = document.querySelector("template");
	const container = document.querySelector(".produkt_visning");
	container.textContent = "";

	cocktails.forEach((el) => {
		filter = el.alkohol_type;

		let klon = cocktailTemplate.cloneNode(true).content;
		klon.querySelector(".name").textContent = el.name;

		if (
			(filter == "vodka" && vodkaBool === true) ||
			(filter == "rom" && romBool === true) ||
			(filter == "gin" && ginBool === true) ||
			(filter == "whiskey" && whiskeyBool === true) ||
			(filter == "tequila" && tequilaBool === true) ||
			(filter == "campari" && campariBool === true) ||
			(filter == "conac" && conacBool === true)
		) {
			klon.querySelector("img").src = `${images}${el.billede_navn}.jpg`;

			// Vis Pop-up
			klon.querySelector(".produkt").addEventListener("click", () => {
				popUpHandler(el);
			});

			container.appendChild(klon);
		}
	});
}

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

	popUp.querySelector("h2").textContent = cocktail.name;
	popUp.querySelector("img").src = `${images}${cocktail.billede_navn}.jpg`;
	popUp.querySelector("p").textContent = `${cocktail.popup_beskrivelse}`;
	popUp.addEventListener("click", (e) => {
		if (e.explicitOriginalTarget.classList == "pop-up") {
			popUp.classList.add("hide");
		}
	});
}

function showSinglePage(cocktail) {
	location.href = `_single-page.html?id=${cocktail._id}`;
}

// Scroll funktion
let bg_pattern = document.querySelector(".background");
// Hver gang der bliver scrollet kører denne funktion
window.addEventListener("scroll", () => {
	// Tager fat i vinduets y-position
	let scroll = window.scrollY;
	// Manipulere positionen for baggrunds mønstret i forhold til scrolling
	bg_pattern.style.transform = `translateY(${scroll * 0.5}px)`;
});

function checkBoxHandler() {
	this.checked ? (this.checked = true) : (this.checked = false);
	vis();
}
