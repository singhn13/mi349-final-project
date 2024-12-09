function updateActiveMenu() {
    const sections = document.querySelectorAll(".content-section");
    const menuItems = document.querySelectorAll(".menu-item");
  
    let currentPage = window.location.pathname.split("/").pop();
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionTop + sectionHeight) {
        currentPage = section.getAttribute("id") + ".html";
      }
    });
  
    menuItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === currentPage) {
        item.classList.add("active");
      }
    });
  }
  
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
  
      const targetPage = item.getAttribute("href");
      window.history.pushState({}, "", targetPage);

      fetch(targetPage)
        .then((response) => response.text())
        .then((html) => {
          document.querySelector(".content").innerHTML = html;

          document.querySelectorAll(".menu-item").forEach((menuItem) => {
            menuItem.classList.remove("active");
          });
          item.classList.add("active");

          updateActiveMenu();
        })
        .catch((error) => console.error('Error loading page:', error));

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  window.addEventListener("load", updateActiveMenu);
  window.addEventListener("scroll", updateActiveMenu);
  