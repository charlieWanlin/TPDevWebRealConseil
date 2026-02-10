export class Plat {
  constructor(nom, description, prix, image, categorie) {
    this.nom = nom;
    this.description = description;
    this.prix = prix; // Prix en nombre (ex: 8.50)
    this.image = image;
    this.categorie = categorie;
    this.disponible = true;
  }

  // Obtenir le prix formaté avec le symbole €
  getPrixFormate() {
    return `${this.prix.toFixed(2).replace(".", ",")}€`;
  }

  // Changer la disponibilité du plat
  toggleDisponibilite() {
    this.disponible = !this.disponible;
  }
}
