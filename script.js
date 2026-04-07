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

const carouselTrack = document.querySelector('.carousel-track');
const images = [
  '1QR3dgg8ROGb8ChCJtPV1X3YNu2V4Veez',
  '1sUslTz5FOwsolA2LwOQw_4J1CjVjQwLb',
  '1MP8K9AXZhPJI2hpiOiaOts2iwW3Xeyyt',
  '1ZgYSn1mXQ6s63GyHrItkbNKgTts8SAMC',
  '11xD5y3n5naVamQBN3g7q9513govr4-NO',
  '1cDSYsHy6e1MztakfOgjtlDe4vqAJtxc0',
  '1U5QweQyEt4Q2kiD_wnYFU7MLQ2CP7a8_'
];

// Add images to track
images.forEach((id, i) => {
  const img = document.createElement('img');
  img.src = `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  if (i === 0) img.classList.add('center');  // first image center
  carouselTrack.appendChild(img);
});

// Clone first and last for infinite loop
const firstClone = carouselTrack.children[0].cloneNode(true);
const lastClone = carouselTrack.children[images.length - 1].cloneNode(true);
carouselTrack.appendChild(firstClone);
carouselTrack.insertBefore(lastClone, carouselTrack.children[0]);

let index = 1;
const updateCarousel = () => {
  const imgWidth = carouselTrack.children[0].offsetWidth + 20; // image + margin
  carouselTrack.style.transform = `translateX(${-imgWidth * index}px)`;

  // Update center class
  Array.from(carouselTrack.children).forEach(img => img.classList.remove('center'));
  carouselTrack.children[index].classList.add('center');
};

// Next/Prev
document.querySelector('.carousel-arrow.right').addEventListener('click', () => {
  index++;
  updateCarousel();
  if (index >= images.length + 1) {
    setTimeout(() => { index = 1; updateCarousel(); }, 500);
  }
});

document.querySelector('.carousel-arrow.left').addEventListener('click', () => {
  index--;
  updateCarousel();
  if (index <= 0) {
    setTimeout(() => { index = images.length; updateCarousel(); }, 500);
  }
});

// Initial position
updateCarousel();