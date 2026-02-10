import { menuData } from "./data.js";

// Afficher les produits selon la catégorie
export function displayProducts(category) {
  const menuGrid = document.getElementById("menuGrid");
  const products = menuData[category];

  if (!menuGrid || !products) return;

  // Vider la grille
  menuGrid.innerHTML = "";

  // Générer les cartes de produits
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition";
    card.innerHTML = `
      <div class="bg-gray-50 rounded-2xl p-10 mb-6 flex items-center justify-center h-52">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-contain" />
      </div>
      
      <h3 class="text-2xl font-bold text-amber-900 mb-2">${product.name}</h3>
      <p class="text-gray-500 text-sm mb-5">${product.description}</p>
      
      <div class="flex items-center justify-between">
        <span class="text-3xl font-bold text-orange-500">${product.price}</span>
        <button class="add-to-cart bg-green-600 text-white font-medium px-6 py-2.5 rounded-full hover:bg-green-700 transition cursor-pointer">
          Ajouter
        </button>
      </div>
    `;

    menuGrid.appendChild(card);
  });
}

// Gérer les boutons actifs
export function setActiveButton(button) {
  // Retirer la classe active de tous les boutons
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove(
      "bg-green-600",
      "text-white",
      "bg-green-100",
      "text-green-700",
    );
    btn.classList.add("bg-white", "text-gray-700");
  });

  // Ajouter la classe active au bouton cliqué
  button.classList.remove(
    "bg-white",
    "text-gray-700",
    "bg-green-100",
    "text-green-700",
  );
  button.classList.add("bg-green-600", "text-white");
}

// Ajouter les hovers dynamiques sur les boutons
export function addButtonHovers() {
  document.querySelectorAll(".category-btn").forEach((btn) => {
    // Hover enter
    btn.addEventListener("mouseenter", () => {
      if (!btn.classList.contains("bg-green-600")) {
        btn.classList.remove("bg-white", "text-gray-700");
        btn.classList.add("bg-green-100", "text-green-700");
      }
    });

    // Hover leave
    btn.addEventListener("mouseleave", () => {
      if (!btn.classList.contains("bg-green-600")) {
        btn.classList.remove("bg-green-100", "text-green-700");
        btn.classList.add("bg-white", "text-gray-700");
      }
    });
  });
}

// Initialiser les boutons de catégorie
export function initCategoryButtons() {
  document.querySelectorAll(".category-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      displayProducts(category);
      setActiveButton(button);
    });
  });
}
