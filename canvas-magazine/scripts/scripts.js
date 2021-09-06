const bodyTag = document.querySelector("body");

const runScripts = () => {
  const headers = document.querySelectorAll("h2, h3");
  const imgHolders = document.querySelectorAll("div.image");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.1) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    {
      threshold: [0, 0.1, 1],
    }
  );

  headers.forEach((header) => observer.observe(header));

  imgHolders.forEach((holders) => observer.observe(holders));
};

runScripts();

barba.init({
  transitions: [
    {
      name: "switch",
      once({ current, next, trigger }) {
        return new Promise((resolve) => {
          const images = document.querySelectorAll("img");
          gsap.set(next.container, { opacity: 0 });
          gsap.set("header", { y: "-100%" });
          imagesLoaded(images, () => {
            const timeline = gsap.timeline({
              onComplete() {
                resolve();
              },
            });
            timeline
              .to("header", { y: "0" })
              .to(next.container, { opacity: 1, delay: 0.5 });
          });
        });
      },
      leave({ current, next, trigger }) {
        return new Promise((resolve) => {
          const timeline = gsap.timeline({
            onComplete() {
              current.container.remove();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
              resolve();
            },
          });
          timeline
            .to("header", { y: "-100%" }, 0)
            .to("footer", { y: "100%" }, 0)
            .to(current.container, { opacity: 0 });
        });
      },
      enter({ current, next, trigger }) {
        return new Promise((resolve) => {
          gsap.set(next.container, { opacity: 0 });
          const timeline = gsap.timeline({
            onComplete() {
              runScripts();
              resolve();
            },
          });
          timeline
            .to("header", { y: "0%" }, 0)
            .to("footer", { y: "0%" }, 0)
            .to(next.container, { opacity: 1 });
        });
      },
    },
  ],
  views: [
    {
      namespace: "product",
      beforeEnter() {
        bodyTag.classList.add("product");
      },
      beforeLeave() {
        bodyTag.classList.remove("product");
      },
    },
  ],
  debug: true,
});
