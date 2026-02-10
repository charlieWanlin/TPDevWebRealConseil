import { menuData } from "./data.js";
import { Panier } from "./panier.js";
import { MenuManager } from "./menuManager.js";

// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {
  // Créer les instances
  const panier = new Panier();
  const menuManager = new MenuManager(menuData, panier);

  // Initialiser
  panier.init();
  menuManager.init();

  // Rendre le panier accessible globalement (pour debug si besoin)
  window.panier = panier;

  console.log("✅ Application initialisée avec succès");
});

console.log("✅ Le fichier main.js est bien chargé !");

const commander = document.querySelector(".commander");
commander.addEventListener("click", () => {
  window.location.href = "menu.html";
});