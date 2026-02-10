import { Plat } from "./Plat.js";

// Créer tous les plats
export const menuData = {
  entrees: [
    new Plat(
      "Maki Saumon",
      "6 pièces · Saumon frais",
      8.5,
      "./assets/img/maki-saumon.webp",
      "entrees",
    ),
    new Plat(
      "California Roll",
      "8 pièces · Avocat, surimi",
      9.0,
      "./assets/img/california-rolls.png",
      "entrees",
    ),
    new Plat(
      "Nigiri Thon",
      "2 pièces · Thon rouge",
      7.0,
      "./assets/img/nigiri-tuna.webp",
      "entrees",
    ),
    new Plat(
      "Temaki",
      "1 pièce · Cône saumon",
      6.5,
      "./assets/img/temaki.webp",
      "entrees",
    ),
  ],

  plats: [
    new Plat(
      "Ramen Tonkotsu",
      "Bouillon porc, œuf mariné",
      14.0,
      "./assets/img/ramen.png",
      "plats",
    ),
    new Plat(
      "Takoyaki",
      "6 boules · Poulpe, sauce okonomiyaki",
      11.5,
      "./assets/img/takoyaki.png",
      "plats",
    ),
    new Plat(
      "Onigiri",
      "Riz, feuilles de nori, légumes",
      16.0,
      "./assets/img/onigiri.png",
      "plats",
    ),
    new Plat(
      "Gyoza",
      "6 pièces · Raviolis japonais, farce légumes",
      13.0,
      "./assets/img/gyoza.png",
      "plats",
    ),
  ],

  desserts: [
    new Plat(
      "Mochi Glacé",
      "3 pièces · Parfums variés",
      5.5,
      "./assets/img/mochi.png",
      "desserts",
    ),
    new Plat(
      "Dorayaki",
      "2 pièces · Pâte haricots",
      4.0,
      "./assets/img/dorayaki.png",
      "desserts",
    ),
    new Plat(
      "Crèpe japonaise",
      "1 pièce · Nutella, fraises, kiwi",
      6.0,
      "./assets/img/crepe-japonaise.png",
      "desserts",
    ),
    new Plat(
      "Egg rolls",
      "2 pièces · Nutella et œufs",
      3.5,
      "./assets/img/egg-rolls.png",
      "desserts",
    ),
  ],

  boissons: [
    new Plat(
      "Dr Pepper",
      "33cl · Soda américain",
      4.0,
      "./assets/img/dr-pepper.png",
      "boissons",
    ),
    new Plat(
      "Ramune",
      "Soda japonais · 33cl",
      3.5,
      "./assets/img/ramune.png",
      "boissons",
    ),
    new Plat(
      "Soju",
      "25cl · Alcool coréen",
      6.0,
      "./assets/img/soju.png",
      "boissons",
    ),
    new Plat(
      "Coca Cola",
      "33cl · Soda classique",
      5.0,
      "./assets/img/coke.png",
      "boissons",
    ),
  ],
};
