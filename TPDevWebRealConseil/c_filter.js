/**
 * =============================================================================
 * UnCoupD'Mains - Page Filtres
 * Scripts: navigation, sidebar filtres, catégories, pagination
 * =============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- CONFIGURATION ----------
  const SCROLL_AMOUNT_NAV = 300;
  const MENU_CLOSE_DELAY = 200;
  const DEFAULT_CATEGORY_ICON = "assets/img/handshake.png";

  // ---------- ÉLÉMENTS DU DOM ----------
  const arrowLeft = document.querySelector(".arrowLeft");
  const arrowRight = document.querySelector(".arrowRight");
  const lesCategories = document.querySelector(".lesCategories");
  const sidebar = document.querySelector(".sidebar");
  const sidebarOverlay = document.querySelector(".sidebarOverlay");
  const closeButton = document.querySelector(".closeButton");
  const categorySelector = document.querySelector(".categorySelector");
  const categoryList = document.querySelector(".categoryList");
  const categoryText = document.querySelector(".category-selector-text");
  const categoryIcon = document.querySelector(".category-selector-icon img");
  const categoryItems = document.querySelectorAll(".category-item");
  const buttonReset = document.querySelector(".buttonReinitialiser");
  const buttonAppliquer = document.querySelector(".buttonAppliquer");

  // ---------- SCROLL DE LA BARRE DE NAVIGATION SECONDAIRE ----------
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

  // ---------- SIDEBAR FILTRES ----------
  const buttonArrows = document.querySelectorAll(".buttonArrow");

  buttonArrows.forEach((btn) => {
    btn.addEventListener("click", () => {
      sidebar?.classList.add("active");
      sidebarOverlay?.classList.add("active");
    });
  });

  if (closeButton && sidebar && sidebarOverlay) {
    closeButton.addEventListener("click", () => {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
  }

  document.addEventListener("click", (e) => {
    if (!sidebar || !sidebarOverlay) return;

    const clickInSidebar = sidebar.contains(e.target);
    const clickOnOpenButton = e.target.closest(".buttonArrow");

    if (!clickInSidebar && !clickOnOpenButton) {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    }
  });

  // ---------- MENU DÉROULANT CATÉGORIES (SIDEBAR) ----------
  if (categorySelector && categoryList) {
    categorySelector.addEventListener("click", () => {
      categoryList.classList.toggle("open");
      categorySelector.classList.toggle("open");
    });
  }

  if (categoryText && categoryIcon) {
    categoryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const textEl = item.querySelector(".textCategory");
        const imgEl = item.querySelector(".category-icon img");

        if (textEl) categoryText.textContent = textEl.textContent;
        if (imgEl) {
          categoryIcon.src = imgEl.src;
          categoryIcon.alt = imgEl.alt ?? "Catégorie";
        }

        categoryList?.classList.remove("open");
        categorySelector?.classList.remove("open");
      });
    });
  }

  // ---------- BOUTON RÉINITIALISER ----------
  if (buttonReset && categoryText && categoryIcon) {
    buttonReset.addEventListener("click", () => {
      const locationInput = document.querySelector(".location-input");
      if (locationInput) locationInput.value = "";

      document.querySelectorAll(".price-input").forEach((input) => {
        input.value = "";
      });

      categoryText.textContent = "Toutes catégories";
      categoryIcon.src = DEFAULT_CATEGORY_ICON;
      categoryIcon.alt = "Toutes catégories";
    });
  }

  // ---------- BOUTON APPLIQUER (FILTRES) ----------
  if (buttonAppliquer && categoryText && sidebar && sidebarOverlay) {
    buttonAppliquer.addEventListener("click", () => {
      const selectedCategory = categoryText.textContent.toLowerCase().trim();
      const locationInput = (
        document.querySelector(".location-input")?.value ?? ""
      )
        .toLowerCase()
        .trim();

      const priceMinInput = document.querySelector(".price-input-min")?.value;
      const priceMaxInput = document.querySelector(".price-input-max")?.value;

      let priceMin = 0;
      if (priceMinInput) priceMin = parseFloat(priceMinInput) || 0;

      let priceMax = Infinity;
      if (priceMaxInput) priceMax = parseFloat(priceMaxInput) || Infinity;

      const cards = document.querySelectorAll(".cardLink");

      cards.forEach((card) => {
        const imgContainer = card.querySelector(".imgContainer");
        if (!imgContainer) return;

        const cardCategory = (
          imgContainer.dataset.category ?? ""
        ).toLowerCase();
        const cardLocation = (
          imgContainer.dataset.location ?? ""
        ).toLowerCase();
        const cardPrice = parseFloat(imgContainer.dataset.price) || 0;

        let show = true;

        if (selectedCategory && selectedCategory !== "toutes catégories") {
          show = cardCategory.includes(selectedCategory);
        }

        if (show && locationInput) {
          show = cardLocation.includes(locationInput);
        }

        if (show && (cardPrice < priceMin || cardPrice > priceMax)) {
          show = false;
        }

        card.style.display = show ? "block" : "none";
      });

      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
    });
  }

  // ---------- FILTRAGE INITIAL PAR URL (?category=xxx) ----------
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromURL = urlParams.get("category");

  if (categoryFromURL) {
    const cards = document.querySelectorAll(".cardLink");

    cards.forEach((card) => {
      const imgContainer = card.querySelector(".imgContainer");

      if (imgContainer?.dataset.category !== categoryFromURL) {
        card.style.display = "none";
      }
    });
  }

  // ---------- PAGINATION ----------
  const pageButtons = document.querySelectorAll(".pageButton");
  const pages = document.querySelectorAll(".pageContent");

  if (pageButtons.length > 0 && pages.length > 0) {
    pageButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const pageNum = button.dataset.page;

        pages.forEach((page) => page.classList.remove("active"));
        pageButtons.forEach((btn) => btn.classList.remove("active"));

        pages.forEach((page) => {
          if (page.dataset.page === pageNum) {
            page.classList.add("active");
          }
        });

        button.classList.add("active");
        window.scrollTo({ top: 0 });
      });
    });

    pageButtons[0]?.click();
  }
});
