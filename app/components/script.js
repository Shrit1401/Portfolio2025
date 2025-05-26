document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const cardPositions = [
    { top: "30%", left: "55%" },
    { top: "20%", left: "25%" },
    { top: "50%", left: "10%" },
    { top: "60%", left: "40%" },
    { top: "30%", left: "30%" },
    { top: "60%", left: "60%" },
    { top: "20%", left: "50%" },
    { top: "60%", left: "10%" },
    { top: "20%", left: "40%" },
    { top: "45%", left: "55%" },
  ];

  const titlesontainer = document.querySelector(".titles");
  const moveDist = window.innerWidth * 3;

  const imagCont = document.querySelector(".images");

  for (let i = 1; i <= 10; i++) {
    const card = document.createElement("div");
    card.className = `caed card-${i}`;

    const img = document.createElement("img");
    img.src = `/work/img-${i}.jpg`;
    img.alt = `Card ${i}`;
    card.appendChild(img);

    const pos = cardPositions[i - 1];
    card.style.top = pos.top;
    card.style.left = pos.left;

    imagCont.appendChild(card);
  }

  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    gsap.set(card, {
      z: -50000,
      scale: 0,
    });
  });

  ScrollTrigger.create({
    trigger: ".sticky",
    start: "top top",
    end: `+=${window.innerHeight * 5}px`,
    scrub: 1,
    pin: true,
    onUpdate: (self) => {
        const xPos = -moveDist * self.progress
        gsap.set(titleContainer, {
            x: xPos,
        })
    }
  });
});
