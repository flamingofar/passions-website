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
	document.querySelector("h2").textContent = json.name;

	cocktail.querySelector(".beskrivelse").textContent = json.lang_beskrivelse;
	cocktail.querySelector("img").src = `${images}${json.billede_navn}.jpg`;
	// ret.querySelector(
	// 	".country"
	// ).textContent = `Land: ${retter.oprindelsesregion}`;
	// ret.querySelector(".pris").textContent = `${retter.pris} kr.`;
	document.querySelector(".back").addEventListener("click", () => {
		history.back();
	});
}
