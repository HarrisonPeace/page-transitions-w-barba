const bodyTag = document.querySelector("body");

barba.use(barbaCss);

barba.init({
  transitions: [
    {
      name: "fade",
      once() {
        
      },
      beforeEnter({ current, next, trigger }) {
        const headerLinks = document.querySelectorAll("header a");
        const href = next.url.path;

        headerLinks.forEach((link) => {
          link.getAttribute("href") === href
            ? link.classList.add("selected")
            : link.classList.remove("selected");
        });

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
    },
  ],
  views: [
    {
      namespace: "feed",
      beforeEnter() {
        bodyTag.classList.add("feed");
      },
      beforeLeave() {
        bodyTag.classList.remove("feed");
      },
    },
  ],
});
