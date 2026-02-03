const menuDeroulant = document.querySelector(".menu-deroulant");
const menuConteneur = document.querySelector(".menu-conteneur");

menuDeroulant.addEventListener("click", () => {
    menuConteneur.classList.toggle("visible");
})
