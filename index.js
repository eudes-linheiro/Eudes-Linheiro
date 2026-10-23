document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mySidenav");
  const menuToggle = document.querySelector(".menu-toggle");
  const navClose = document.querySelector(".nav-close");

  const setNavOpen = (open) => {
    nav.classList.toggle("open", open);
    document.body.classList.toggle("nav-open", open);

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation"
      );
    }

    if (navClose) {
      navClose.setAttribute("aria-expanded", String(open));
    }
  };

  menuToggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    setNavOpen(!nav.classList.contains("open"));
  });

  navClose?.addEventListener("click", (event) => {
    event.stopPropagation();
    setNavOpen(false);
  });

  document.addEventListener("click", (event) => {
    const clickInsideNav = nav.contains(event.target);
    const clickOnMenu = menuToggle && menuToggle.contains(event.target);
    const clickOnClose = navClose && navClose.contains(event.target);

    if (!clickInsideNav && !clickOnMenu && !clickOnClose) {
      setNavOpen(false);
    }
  });

  const modals = document.querySelectorAll(".modal");
  const modalTriggers = document.querySelectorAll("[data-modal-target]");
  const modalClosers = document.querySelectorAll("[data-close]");

  const openModal = (id) => {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  modalTriggers.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button.getAttribute("data-modal-target"));
    });
  });

  modalClosers.forEach((button) => {
    button.addEventListener("click", () => {
      closeModal(button.closest(".modal"));
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modals.forEach((modal) => closeModal(modal));
      setNavOpen(false);
    }
  });
});
