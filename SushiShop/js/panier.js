export class Panier {
  constructor() {
    this.articles = []; // Liste des articles dans le panier
    this.modal = document.getElementById("cartModal");
    this.btnOuvrir = document.querySelector(".logo-panier button");
    this.btnFermer = document.getElementById("closeCart");
    this.badge = document.querySelector(".logo-panier .badge");
  }

  // Ajouter un plat au panier
  ajouterPlat(plat) {
    // Vérifier si le plat existe déjà
    const index = this.articles.findIndex(
      (article) => article.plat.nom === plat.nom,
    );

    if (index !== -1) {
      // Si le plat existe, augmenter la quantité
      this.articles[index].quantite++;
    } else {
      // Sinon, ajouter un nouvel article
      this.articles.push({
        plat: plat,
        quantite: 1,
      });
    }

    this.mettreAJourAffichage();
    this.mettreAJourBadge();
  }

  // Retirer un plat du panier
  retirerPlat(plat) {
    const index = this.articles.findIndex(
      (article) => article.plat.nom === plat.nom,
    );

    if (index !== -1) {
      this.articles.splice(index, 1);
      this.mettreAJourAffichage();
      this.mettreAJourBadge();
    }
  }

  // Augmenter la quantité d'un plat
  augmenterQuantite(plat) {
    const article = this.articles.find((a) => a.plat.nom === plat.nom);
    if (article) {
      article.quantite++;
      this.mettreAJourAffichage();
      this.mettreAJourBadge();
    }
  }

  // Diminuer la quantité d'un plat
  diminuerQuantite(plat) {
    const article = this.articles.find((a) => a.plat.nom === plat.nom);
    if (article) {
      article.quantite--;
      if (article.quantite <= 0) {
        this.retirerPlat(plat);
      } else {
        this.mettreAJourAffichage();
        this.mettreAJourBadge();
      }
    }
  }

  // Calculer le total du panier
  calculerTotal() {
    return this.articles.reduce((total, article) => {
      return total + article.plat.prix * article.quantite;
    }, 0);
  }

  // Obtenir le nombre total d'articles
  getNombreArticles() {
    return this.articles.reduce(
      (total, article) => total + article.quantite,
      0,
    );
  }

  // Vider le panier
  vider() {
    this.articles = [];
    this.mettreAJourAffichage();
    this.mettreAJourBadge();
  }

  // Mettre à jour l'affichage du badge
  mettreAJourBadge() {
    if (this.badge) {
      this.badge.textContent = this.getNombreArticles();
    }
  }

 // Mettre à jour l'affichage du panier
mettreAJourAffichage() {
  const emptyCart = document.getElementById("emptyCart");
  const cartItems = document.getElementById("cartItems");
  const totalElement = document.querySelector(".cart-total");

  console.log("🔍 Articles dans le panier:", this.articles);
  console.log("🔍 Total calculé:", this.calculerTotal());
  console.log("🔍 Element total trouvé:", totalElement);

  if (this.articles.length === 0) {
    // Panier vide
    if (emptyCart) emptyCart.classList.remove("hidden");
    if (cartItems) cartItems.classList.add("hidden");
    if (totalElement) totalElement.textContent = "0,00€";
  } else {
    // Panier avec articles
    if (emptyCart) emptyCart.classList.add("hidden");
    if (cartItems) {
      cartItems.classList.remove("hidden");
      cartItems.innerHTML = "";

      // Générer chaque article
      this.articles.forEach((article) => {
        console.log("📦 Article:", article.plat.nom, "Prix:", article.plat.prix, "Quantité:", article.quantite);
        const articleElement = this.creerElementArticle(article);
        cartItems.appendChild(articleElement);
      });
    }

    // Mettre à jour le total
    if (totalElement) {
      const total = this.calculerTotal();
      const totalFormate = `${total.toFixed(2).replace(".", ",")}€`;
      console.log("💰 Total formaté:", totalFormate);
      totalElement.textContent = totalFormate;
    }
  }
}

  // Créer l'élément HTML d'un article
  creerElementArticle(article) {
    const div = document.createElement("div");
    div.className = "flex items-center gap-4 bg-gray-50 rounded-2xl p-4";
    div.innerHTML = `
      <img src="${article.plat.image}" alt="${article.plat.nom}" class="w-16 h-16 object-contain" />
      <div class="flex-1">
        <h4 class="font-bold text-amber-900">${article.plat.nom}</h4>
        <p class="text-sm text-gray-500">${article.plat.description}</p>
      </div>
      <div class="flex items-center gap-3">
        <button class="btn-diminuer w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer transition">-</button>
        <span class="font-semibold text-amber-900 min-w-5 text-center">${article.quantite}</span>
        <button class="btn-augmenter w-7 h-7 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center cursor-pointer transition">+</button>
      </div>
      <span class="font-bold text-orange-500 ml-2">${(article.plat.prix * article.quantite).toFixed(2).replace(".", ",")}€</span>
    `;

    // Ajouter les événements
    const btnDiminuer = div.querySelector(".btn-diminuer");
    const btnAugmenter = div.querySelector(".btn-augmenter");

    btnDiminuer.addEventListener("click", () =>
      this.diminuerQuantite(article.plat),
    );
    btnAugmenter.addEventListener("click", () =>
      this.augmenterQuantite(article.plat),
    );

    return div;
  }

  // Ouvrir le modal
  ouvrir() {
    if (this.modal) {
      this.modal.classList.remove("hidden");
      this.modal.classList.add("flex");
    }
  }

  // Fermer le modal
  fermer() {
    if (this.modal) {
      this.modal.classList.add("hidden");
      this.modal.classList.remove("flex");
    }
  }

  // Initialiser les événements
  init() {
    if (!this.btnOuvrir || !this.modal || !this.btnFermer) {
      console.error("Éléments du panier manquants");
      return;
    }

    // Ouvrir le modal
    this.btnOuvrir.addEventListener("click", () => this.ouvrir());

    // Fermer via le bouton
    this.btnFermer.addEventListener("click", () => this.fermer());

    // Fermer via l'overlay
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.fermer();
      }
    });

    // Mettre à jour l'affichage initial
    this.mettreAJourAffichage();
    this.mettreAJourBadge();
  }
}

let total = 0;
for (let i = 1; i <= 5; i++) {
  total += i;
}
console.log(total);