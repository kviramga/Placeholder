const flowers = document.querySelectorAll('.flower');
const flowerData = [];

const POSITIONS = [
  [3, 5],[16, 10],[5, 26],[62, 5],[80, 10],[90, 3],
  [8, 47],[28, 32],[52, 24],[74, 36],[92, 40],
  [4, 68],[22, 57],[44, 54],[66, 60],[86, 62],
  [93, 76],[8, 86],[32, 80],[54, 86],[74, 90],
  [91, 92],[38, 14],[56, 46],[80, 50],[36, 40],[48, 70]
];

const TYPES = [
  'style-a','style-b','style-a','style-b','style-a','style-b',
  'style-a','style-b','style-a','style-b','style-a',
  'style-b','style-a','style-b','style-a','style-b','style-a',
  'style-b','style-a','style-b','style-a','style-b',
  'style-a','style-b','style-a','style-b','style-a'
];

function layoutFlowers() {
  const sizeOptions = [3, 7, 11];
  const colors = ['rgba(223, 147, 133, 0.7)', 'rgba(232, 149, 51, 0.7)'];

  flowerData.length = 0; // clear previous data

  flowers.forEach((flower, i) => {
    if (i >= POSITIONS.length) return;

    const [left, top] = POSITIONS[i];
    const size = sizeOptions[i % sizeOptions.length];
    const initialRotation = (i % 5) * 12 - 24;

    flower.style.position = 'absolute'; // must be absolute
    flower.style.left = `${left}%`;
    flower.style.top = `${top}%`;
    flower.style.width = `${size}rem`;
    flower.style.height = `${size}rem`;
    flower.style.fontSize = `${size}rem`;
    flower.style.lineHeight = '1';
    flower.style.textAlign = 'center';
    flower.style.color = colors[i % colors.length];

    // Important: rotate from the center
    flower.style.transformOrigin = '50% 50%';
    flower.style.transform = `rotate(${initialRotation}deg)`;

    flower.classList.remove('style-a','style-b');
    flower.classList.add(TYPES[i]);

    flowerData.push({
      initialRotation,
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
    if (!data) return;
    const totalRotation = data.initialRotation + (scrollY * data.scrollSensitivity);
    flower.style.transform = `rotate(${totalRotation}deg)`;
    flower.style.transformOrigin = '50% 50%';
  });
});

// FAQ toggle
const faqCards = document.querySelectorAll('.faq-card');
faqCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('open');
  });
});

// Smooth scroll for navbar links and hero buttons
document.querySelectorAll('.nav-links a, .hero-cta').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault(); // Prevent default anchor jump

    const targetId = link.getAttribute('href')?.slice(1); // remove # if present
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});