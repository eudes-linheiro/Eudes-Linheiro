document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mySidenav");
  const menuToggle = document.querySelector(".menu-toggle");
  const navClose = document.querySelector(".nav-close");

  const openNav = () => nav.classList.add("open");
  const closeNav = () => nav.classList.remove("open");

  menuToggle?.addEventListener("click", openNav);
  navClose?.addEventListener("click", closeNav);

  const modals = document.querySelectorAll(".modal");
  const modalTriggers = document.querySelectorAll("[data-modal-target]");
  const modalCloses = document.querySelectorAll("[data-close]");

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
      const target = button.getAttribute("data-modal-target");
      openModal(target);
    });
  });

  modalCloses.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      closeModal(modal);
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
      closeNav();
    }
  });
});
