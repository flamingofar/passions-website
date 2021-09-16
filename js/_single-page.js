/** @format */

//GET - Hente variable fra URL
const URlParams = new URLSearchParams(window.location.search);
const id = URlParams.get("id");

// RestDB detaljer
const db = `https://cocktails-2d4e.restdb.io/rest/cocktails/${id}`;
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

window.addEventListener("DOMContentLoaded", start);

function start() {
	loadJSON();
}

// Rest API Call
async function loadJSON() {
	const JSONData = await fetch(db, settings);
	cocktail = await JSONData.json();
	console.log(cocktail);
	vis(cocktail);
}

function vis(json) {
	const cocktail = document.querySelector(".cocktail");
	const images = "./assets/images/cocktails/";
	const ingredienser = cocktail.querySelector(".ingredienser li:nth-child(1)");
	document.querySelector("h2").textContent = json.name;

	cocktail.querySelector(".beskrivelse").textContent = json.lang_beskrivelse;
	cocktail.querySelector("img").src = `${images}${json.billede_navn}.webp`;

	// Ingredienser
	cocktail.querySelector(
		"ul li:nth-child(1)"
	).textContent = `${json.ingrediens_1}`;
	cocktail.querySelector(
		"ul li:nth-child(2)"
	).textContent = `${json.ingrediens_2}`;
	cocktail.querySelector(
		"ul li:nth-child(3)"
	).textContent = `${json.ingrediens_3}`;
	cocktail.querySelector(
		"ul li:nth-child(4)"
	).textContent = `${json.ingrediens_4}`;
	cocktail.querySelector(
		"ul li:nth-child(5)"
	).textContent = `${json.ingrediens_5}`;
	cocktail.querySelector(
		"ul li:nth-child(6)"
	).textContent = `${json.ingrediens_6}`;
	cocktail.querySelector(
		"ul li:nth-child(7)"
	).textContent = `${json.ingrediens_7}`;
	cocktail.querySelector(
		"ul li:nth-child(8)"
	).textContent = `${json.ingrediens_8}`;

	// Garnish
	if (!cocktail.isterninger) {
		cocktail.querySelector(".garnish li:nth-child(1)").textContent =
			"Isterninger";
	}
	if (!cocktail.garnish) {
		cocktail.querySelector(
			".garnish li:nth-child(2)"
		).textContent = `${cocktail.garnish_type}`;
	}

	// Instrukser
	cocktail.querySelector(
		".how-to li:nth-child(1)"
	).textContent = `${json.instruks_1}`;
	cocktail.querySelector(
		".how-to li:nth-child(2)"
	).textContent = `${json.instruks_2}`;
	cocktail.querySelector(
		".how-to li:nth-child(3)"
	).textContent = `${json.instruks_3}`;
	cocktail.querySelector(
		".how-to li:nth-child(4)"
	).textContent = `${json.instruks_4}`;

	// Tilbage til forrige side Knap
	document.querySelector(".back").addEventListener("click", () => {
		history.back();
	});
}
