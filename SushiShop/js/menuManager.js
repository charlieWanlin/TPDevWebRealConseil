export class MenuManager {
  constructor(plats, panier) {
    this.plats = plats; // Objet avec toutes les catégories
    this.panier = panier; // Instance du panier
    this.menuGrid = document.getElementById("menuGrid");
    this.categoryButtons = document.querySelectorAll(".category-btn");
    this.categorieActive = "entrees";
  }

  // Afficher les produits d'une catégorie
  afficherProduits(categorie) {
    const produits = this.plats[categorie];

    if (!this.menuGrid || !produits) {
      console.error("Grille ou catégorie introuvable");
      return;
    }

    // Vider la grille
    this.menuGrid.innerHTML = "";

    // Générer les cartes de produits
    produits.forEach((plat) => {
      const carte = this.creerCarte(plat);
      this.menuGrid.appendChild(carte);
    });

    this.categorieActive = categorie;
  }

  // Créer une carte de produit
  creerCarte(plat) {
    const div = document.createElement("div");
    div.className =
      "bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition";

    div.innerHTML = `
      <div class="bg-gray-50 rounded-2xl p-10 mb-6 flex items-center justify-center h-52">
        <img src="${plat.image}" alt="${plat.nom}" class="w-full h-full object-contain" />
      </div>
      
      <h3 class="text-2xl font-bold text-amber-900 mb-2">${plat.nom}</h3>
      <p class="text-gray-500 text-sm mb-5">${plat.description}</p>
      
      <div class="flex items-center justify-between">
        <span class="text-3xl font-bold text-orange-500">${plat.getPrixFormate()}</span>
        <button class="btn-ajouter bg-green-600 text-white font-medium px-6 py-2.5 rounded-full hover:bg-green-700 transition cursor-pointer">
          Ajouter
        </button>
      </div>
    `;

    // Ajouter l'événement au bouton
    const btnAjouter = div.querySelector(".btn-ajouter");
    btnAjouter.addEventListener("click", () => {
      this.panier.ajouterPlat(plat);
      this.afficherNotification(`${plat.nom} ajouté au panier !`);
    });

    return div;
  }

  // Afficher une notification
  afficherNotification(message) {
    // Créer la notification
    const notification = document.createElement("div");
    notification.className =
      "fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transition-all z-50";
    notification.textContent = message;

    document.body.appendChild(notification);

    // Retirer après 2 secondes
    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => notification.remove(), 300);
    }, 2000);
  }

  // Définir le bouton actif
  definirBoutonActif(button) {
    // Retirer l'état actif de tous les boutons
    this.categoryButtons.forEach((btn) => {
      btn.classList.remove(
        "bg-green-600",
        "text-white",
        "bg-green-100",
        "text-green-700",
      );
      btn.classList.add("bg-white", "text-gray-700");
    });

    // Ajouter l'état actif au bouton cliqué
    button.classList.remove(
      "bg-white",
      "text-gray-700",
      "bg-green-100",
      "text-green-700",
    );
    button.classList.add("bg-green-600", "text-white");
  }

  // Ajouter les effets hover aux boutons
  ajouterHoversButtons() {
    this.categoryButtons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        if (!btn.classList.contains("bg-green-600")) {
          btn.classList.remove("bg-white", "text-gray-700");
          btn.classList.add("bg-green-100", "text-green-700");
        }
      });

      btn.addEventListener("mouseleave", () => {
        if (!btn.classList.contains("bg-green-600")) {
          btn.classList.remove("bg-green-100", "text-green-700");
          btn.classList.add("bg-white", "text-gray-700");
        }
      });
    });
  }

  // Initialiser le menu
  init() {
    // Afficher la catégorie par défaut
    this.afficherProduits(this.categorieActive);

    // Activer le bouton par défaut
    const btnParDefaut = document.querySelector(
      `[data-category="${this.categorieActive}"]`,
    );
    if (btnParDefaut) {
      this.definirBoutonActif(btnParDefaut);
    }

    // Ajouter les hovers
    this.ajouterHoversButtons();

    // Événements sur les boutons de catégorie
    this.categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const categorie = button.getAttribute("data-category");
        this.afficherProduits(categorie);
        this.definirBoutonActif(button);
      });
    });
  }
}
