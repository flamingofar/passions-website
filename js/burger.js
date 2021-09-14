/*Siden loades og venter på respons fra bruger*/
document.addEventListener("DOMContentLoaded", sidenVises);

/*Funktionen går i gang når burgermenuen trykkes på*/
function sidenVises() {
  console.log("sidenVises");

  document.querySelector("#menuknap").addEventListener("click", toggleMenu);
}

/*Funktionen fjerner eller tilføjer classen hidden som gemmer den og ændre ikon*/
function toggleMenu() {
  console.log("toggleMenu");

  document.querySelector("#menu").classList.toggle("hidden");

  let erSkjult = document.querySelector("#menu").classList.contains("hidden");

  if (erSkjult == true) {
    document.querySelector("#menuknap").textContent = "☰";
  } else {
    document.querySelector("#menuknap").textContent = "✕";
  }
}
