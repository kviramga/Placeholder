/* FLOWERS */
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

    flower.style.position = 'absolute';
    flower.style.left = `${left}%`;
    flower.style.top = `${top}%`;
    flower.style.width = `${size}rem`;
    flower.style.height = `${size}rem`;
    flower.style.fontSize = `${size}rem`;
    flower.style.lineHeight = '1';
    flower.style.textAlign = 'center';
    flower.style.color = colors[i % colors.length];

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

/* FAQ toggle */
const faqCards = document.querySelectorAll('.faq-card');
faqCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('open');
  });
});

/* Smooth scroll for navbar links and hero buttons */
document.querySelectorAll('.nav-links a, .hero-cta').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('href')?.slice(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* CAROUSEL */
const images = [
  '1_S25CJrLUfPKWUwft6DFHbZTbd-oWeCN',
  '1mSTdIjmH-Q6EZN4ZQQKwr9qVuFl8JJVD',
  '1MP8K9AXZhPJI2hpiOiaOts2iwW3Xeyyt',
  '1t_kDYEzJtgN4WeN-cZDex4XTwZL4Q3bg',
  '1QR3dgg8ROGb8ChCJtPV1X3YNu2V4Veez',
  '1sUslTz5FOwsolA2LwOQw_4J1CjVjQwLb',
  '1x-h7Bd6jbHtN-xDqSbTHV_6DJGIf3Z_e',
  '1uwnXnteXUdymN55y-Z0bTx2HPfVgojx6',
  '1G0E7Gm1VaiICi3wytYUR7PGKJ7qrX12E',
  '1bVhfZhIgrwGrBksdvX8ov_e0o-DflBdE',
  '1IXTEQMknsuz2_788L_0HCTQZksYiRK2Z',
  '1reupqlbbvi4MH3BmzusPLVJWlM58IIPR'
];

let index = 0;
let animating = false;
const DURATION = 450; // ms

function imgUrl(id) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
}

function idx(offset) {
  return (index + offset + images.length) % images.length;
}

// Build a 5-slot track: [far-prev] [prev] [center] [next] [far-next]
// Only prev/center/next are visible; far slots are offscreen buffers
const track = document.querySelector('.carousel-track');
track.innerHTML = '';

const slots = [];
for (let i = 0; i < 5; i++) {
  const img = document.createElement('img');
  img.style.cssText = `
    flex-shrink: 0;
    border-radius: 20px;
    object-fit: cover;
    transition: width ${DURATION}ms ease, opacity ${DURATION}ms ease;
  `;
  track.appendChild(img);
  slots.push(img);
}

// slot roles: 0=far-prev, 1=prev, 2=center, 3=next, 4=far-next
function applySlotStyles() {
  const styles = [
    { width: '60%', opacity: '0',   margin: '0' },       // far-prev (hidden)
    { width: '60%', opacity: '0.5', margin: '0 10px' },  // prev
    { width: '80%', opacity: '1',   margin: '0 10px' },  // center
    { width: '60%', opacity: '0.5', margin: '0 10px' },  // next
    { width: '60%', opacity: '0',   margin: '0' },       // far-next (hidden)
  ];
  slots.forEach((img, i) => {
    img.style.width   = styles[i].width;
    img.style.opacity = styles[i].opacity;
    img.style.margin  = styles[i].margin;
  });
}

function loadSlots() {
  slots[0].src = imgUrl(images[idx(-2)]);
  slots[1].src = imgUrl(images[idx(-1)]);
  slots[2].src = imgUrl(images[idx( 0)]);
  slots[3].src = imgUrl(images[idx( 1)]);
  slots[4].src = imgUrl(images[idx( 2)]);
}

function slide(direction) {
  if (animating) return;
  animating = true;

  // Pre-load the incoming offscreen image
  if (direction === 1) {
    slots[4].src = imgUrl(images[idx(2)]);
  } else {
    slots[0].src = imgUrl(images[idx(-2)]);
  }

  // Slide the track: each slot is ~70% wide on average, shift by one slot width
  const slotWidth = track.offsetWidth * 0.72;
  track.style.transition = `transform ${DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
  track.style.transform  = `translateX(${-direction * slotWidth}px)`;

  setTimeout(() => {
    // Kill transition for instant reset
    track.style.transition = 'none';
    track.style.transform  = 'translateX(0)';

    // Advance index and reload all slots in new positions
    index = idx(direction);
    loadSlots();
    applySlotStyles();

    // Allow next click
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { animating = false; });
    });
  }, DURATION);
}

// Init
loadSlots();
applySlotStyles();

document.querySelector('.arrow.right').addEventListener('click', () => slide(1));
document.querySelector('.arrow.left').addEventListener('click',  () => slide(-1));