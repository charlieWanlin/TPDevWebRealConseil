/**
 * =============================================================================
 * UnCoupD'Mains - Page Services
 * Scripts: navigation, menus déroulants, carrousels
 * =============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- CONFIGURATION ----------
  const SCROLL_AMOUNT_NAV = 300;
  const SCROLL_AMOUNT_CAROUSEL = 500;
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

  // ---------- CARROUSELS DE SERVICES ----------
  const carouselSections = document.querySelectorAll(".carouselSection");

  carouselSections.forEach((section) => {
    const buttonLeft = section.querySelector(".carouselButtonLeft");
    const buttonRight = section.querySelector(".carouselButtonRight");
    const track = section.querySelector(".carouselTrack");

    if (!buttonLeft || !buttonRight || !track) return;

    function updateCarouselArrows() {
      const { scrollLeft, clientWidth, scrollWidth } = track;
      const atStart = scrollLeft <= 1;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 1;

      buttonLeft.classList.toggle("visible", !atStart);
      buttonRight.classList.toggle("hidden", atEnd);
    }

    buttonRight.addEventListener("click", () => {
      track.scrollBy({ left: SCROLL_AMOUNT_CAROUSEL, behavior: "smooth" });
    });

    buttonLeft.addEventListener("click", () => {
      track.scrollBy({ left: -SCROLL_AMOUNT_CAROUSEL, behavior: "smooth" });
    });

    track.addEventListener("scroll", updateCarouselArrows);
    window.addEventListener("resize", updateCarouselArrows);
    updateCarouselArrows();
  });
});
