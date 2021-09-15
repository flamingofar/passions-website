/** @format */

// Burger Menu
/*
 Siden loades og venter på respons fra bruger
 
 */

document.addEventListener("DOMContentLoaded", sidenVises);

/*Funktionen går i gang når burgermenuen trykkes på*/
function sidenVises() {
	document
		.querySelector("#burger_wrapper")
		.addEventListener("click", toggleMenu);
}
/*Funktionen fjerner eller tilføjer classen hidden som gemmer den og ændre ikon*/
function toggleMenu() {
	document.querySelector(".menu").classList.toggle("hidden");
	document.querySelector("#menuknap").classList.toggle("kryds");
}
