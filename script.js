const flowers = document.querySelectorAll('.flower');
const flowerData = [];

function layoutFlowers() {
  const cols = 6;
  const rows = 5;

  const sizeOptions = [4, 6, 8];
  const colors = ['rgba(223, 147, 133, 0.32)', 'rgba(232, 149, 51, 0.32)'];

  flowers.forEach((flower, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    let left = (col + 0.5) * (100 / cols);
    let top = (row + 0.5) * (100 / rows);

    const offsetX = (col % 2 === 0 ? -3 : 3);
    const offsetY = (row % 2 === 0 ? -3 : 3);

    left += offsetX;
    top += offsetY;

    const size = sizeOptions[i % sizeOptions.length];
    const initialRotation = (i % 5) * 12 - 24;

    flower.style.left = `${left}%`;
    flower.style.top = `${top}%`;
    flower.style.width = `${size}rem`;
    flower.style.height = `${size}rem`;
    flower.style.fontSize = `${size}rem`;
    flower.style.transform = `rotate(${initialRotation}deg)`;
    flower.style.color = colors[i % colors.length];

    // ✅ store data for scroll animation
    flowerData.push({
      initialRotation: initialRotation,
      scrollSensitivity: 0.2 + (i % 3) * 0.1
    });
  });
}

layoutFlowers();

// Scroll rotation
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  flowers.forEach((flower, idx) => {
    const data = flowerData[idx];

    const additionalRotation = (scrollY * data.scrollSensitivity) % 360;
    const totalRotation = data.initialRotation + additionalRotation;

    flower.style.transform = `rotate(${totalRotation}deg)`;
  });
});

// FAQ toggle
const faqCards = document.querySelectorAll('.faq-card');

faqCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('open');
  });
});