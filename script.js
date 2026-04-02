const flowers = document.querySelectorAll('.flower');
const flowerData = [];

function randomizeFlowers() {
  flowers.forEach((flower, idx) => {
    // Truly random positions across the entire viewport
    const left = Math.random() * 100;
    const top = Math.random() * 100;

    // More obvious size differences
    const sizes = [2, 6, 10]; // small, medium, large
    const size = sizes[Math.floor(Math.random() * sizes.length)];

    const rot = Math.random() * 60 - 30;
    const scrollSensitivity = Math.random() * 0.5 + 0.3;

    flower.style.left = `${left}%`;
    flower.style.top = `${top}%`;
    flower.style.fontSize = `${size}rem`;
    flower.style.transform = `rotate(${rot}deg)`;

    // Pink and orange colors
    const colors = ['#FF69B4', '#E89533'];
    flower.style.color = colors[Math.floor(Math.random() * colors.length)];

    flowerData[idx] = {
      initialRotation: rot,
      scrollSensitivity: scrollSensitivity
    };
  });
}

// Scroll rotation
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  flowers.forEach((flower, idx) => {
    const data = flowerData[idx];
    if (data) {
      const additionalRotation = (scrollY * data.scrollSensitivity) % 360;
      const totalRotation = data.initialRotation + additionalRotation;
      flower.style.transform = `rotate(${totalRotation}deg)`;
    }
  });
});

randomizeFlowers();

const faqCards = document.querySelectorAll('.faq-card');

faqCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('open'); // toggle only clicked card
  });
});