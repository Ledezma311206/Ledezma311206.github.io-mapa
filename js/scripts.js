/*!
 * Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
 */
//
// Scripts
//

const center = [25.576573096128243, -103.43675995187371];
const zoom = 12;

const dialog = document.querySelector(".popup");
const iconSelector = document.getElementById("iconSelector");
const buttonCancel = document.querySelector(".button-cancel");
const buttonSave = document.querySelector(".button-save");
const placeName = document.querySelector(".place-name");
const inputLatitude = document.querySelector(".input-latitude");
const inputLongitude = document.querySelector(".input-longitude");
const betweenstreets = document.querySelector(".between-streets");
const icon1 = L.icon({
  iconUrl:
    "https://ledezma311206.github.io/Ledezma311206.github.io-mapa/assets/img/marcadorrojo.ico",
  iconSize: [48, 80],
});

const icon2 = L.icon({
  iconUrl:
    "https://ledezma311206.github.io/Ledezma311206.github.io-mapa/assets/img/marcadorazul.ico",
  iconSize: [48, 80],
});

const icon3 = L.icon({
  iconUrl:
    "https://ledezma311206.github.io/Ledezma311206.github.io-mapa/assets/img/marcadoramarillo.ico",
  iconSize: [48, 80],
});
const icon4 = L.icon({
  iconUrl:
    "https://ledezma311206.github.io/Ledezma311206.github.io-mapa/assets/img/marcadorverde.ico",
  iconSize: [48, 80],
});

function getIconoSeleccionado() {
  const value = iconSelector.value;

  if (value === "icon1") return icon1;
  if (value === "icon2") return icon2;
  if (value === "icon3") return icon3;
  if (value === "icon4") return icon4;
}

const supaBaseUrl = "https://cpcznxhsigllyvsclosf.supabase.co";
const supaBaseKey = "sb_publishable_ajvyI_5GdAPJ-EV1xlQhHQ_kYy_LOHd";
supabase = window.supabase.createClient(supaBaseUrl, supaBaseKey);
const v1 = document.querySelector("#title");
v1.textContent = "";

const map = L.map("map").setView(center, zoom);

async function loadSavedIcons() {
  const { data, error } = await supabase.from("cordinates").select("*");

  if (error) {
    console.error("Error from supabase", "error");
    return;
  }

  data.forEach((element) => {
    let icono;

    if (element.icon === "icon1") icono = icon1;
    if (element.icon === "icon2") icono = icon2;
    if (element.icon === "icon3") icono = icon3;
    if (element.icon === "icon4") icono = icon4;

    L.marker([element.lat, element.lng], { icon: icono })
      .addTo(map)
      .bindPopup(element.placeName);
  });
}

loadSavedIcons();

buttonCancel.addEventListener("click", () => {
  dialog.close();
});
buttonSave.addEventListener("click", async (e) => {
  e.preventDefault();
  const iconValue = iconSelector.value;
  const lat = inputLatitude.value;
  const lng = inputLongitude.value;
  const pln = placeName.value;
  const bst = betweenstreets.value;
  L.marker([lat, lng], { icon: getIconoSeleccionado() })
    .addTo(map)
    .bindPopup(pln)
    .openPopup();

  const { error } = await supabase.from("cordinates").insert([
    {
      lat: lat,
      lng: lng,
      placeName: pln,
      betweenstreets: bst,
      icon: iconValue,
    },
  ]);

  dialog.close();
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

let clickMarker = null;

var myCustomIcon = L.icon({
  iconUrl: "../assets/img/algodoneros.jpg",
  shadowUrl: "",
  iconSize: [48, 48],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

map.on("click", async (e) => {
  const { lat, lng } = e.latlng;

  inputLatitude.value = lat;
  inputLongitude.value = lng;

  dialog.showModal();

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;

    inputLatitude.value = lat;
    inputLongitude.value = lng;

    dialog.showModal();
  });
});

window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      rootMargin: "0px 0px -40%",
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link"),
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});
