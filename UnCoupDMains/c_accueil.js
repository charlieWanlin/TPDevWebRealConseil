/**
 * =============================================================================
 * UnCoupD'Mains - Page Accueil
 * Scripts: navigation, menus déroulants, filtrage par catégorie (URL)
 * =============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- CONFIGURATION ----------
  const SCROLL_AMOUNT_NAV = 300;
  const MENU_CLOSE_DELAY = 200;

  // ---------- SCROLL DE LA BARRE DE NAVIGATION SECONDAIRE ----------
  const arrowLeft = document.querySelector(".arrowLeft");
  const arrowRight = document.querySelector(".arrowRight");
  const lesCategories = document.querySelector(".lesCategories");

  function updateNavArrows() {
    if (!lesCategories || !arrowLeft || !arrowRight) return;
    const { scrollLeft, clientWidth, scrollWidth } = lesCategories;
    const atStart = scrollLeft <= 1;
    const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;

    arrowLeft.classList.toggle("visible", !atStart);
    arrowRight.classList.toggle("hidden", atEnd);
  }

  if (arrowLeft && arrowRight && lesCategories) {
    arrowLeft.addEventListener("click", () => {
      lesCategories.scrollBy({ left: -SCROLL_AMOUNT_NAV, behavior: "smooth" });
    });
    arrowRight.addEventListener("click", () => {
      lesCategories.scrollBy({ left: SCROLL_AMOUNT_NAV, behavior: "smooth" });
    });
    lesCategories.addEventListener("scroll", updateNavArrows);
    window.addEventListener("resize", updateNavArrows);
    updateNavArrows();
  }

  // ---------- MENUS DÉROULANTS DES CATÉGORIES ----------
  const menuSubCategories = document.querySelectorAll(
    ".grosOngletsEtSubMenu > li"
  );

  menuSubCategories.forEach((categoryItem) => {
    const subMenu = categoryItem.querySelector(".subMenu");

    if (!subMenu) return;

    let closeDelayTimer;

    const openMenu = () => {
      clearTimeout(closeDelayTimer);
      subMenu.classList.add("active");
    };

    const scheduleClose = () => {
      closeDelayTimer = setTimeout(() => {
        subMenu.classList.remove("active");
      }, MENU_CLOSE_DELAY);
    };

    categoryItem.addEventListener("mouseenter", openMenu);
    categoryItem.addEventListener("mouseleave", scheduleClose);
    subMenu.addEventListener("mouseenter", openMenu);
    subMenu.addEventListener("mouseleave", scheduleClose);
  });

  // ---------- FILTRAGE PAR CATÉGORIE (paramètre URL ?category=xxx) ----------
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get("category");

  if (selectedCategory) {
    const services = document.querySelectorAll(".imgContainer[data-category]");

    services.forEach((service) => {
      const serviceCategory = service.dataset.category;

      if (serviceCategory !== selectedCategory) {
        service.closest(".cardLink")?.style.setProperty("display", "none");
      }
    });
  }
});
