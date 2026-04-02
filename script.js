const flowers = document.querySelectorAll('.flower');
const flowerData = [];

// [left%, top%] — viewport coordinates, 0,0 = top-left, 100,100 = bottom-right
// Left col: 2–14%, right col: 86–96%, center: 20–80%
const POSITIONS = [
  //  left   top       zone
  [    5,   14  ],  //  0  style-a  — left col
  [   10,   42  ],  //  1  style-b  — left col
  [    6,   68  ],  //  2  style-a  — left col
  [    3,   88  ],  //  3  style-b  — left col bottom
  [   88,   12  ],  //  4  style-a  — right col
  [   93,   35  ],  //  5  style-b  — right col
  [   87,   58  ],  //  6  style-a  — right col
  [   92,   80  ],  //  7  style-b  — right col bottom
  [   22,    4  ],  //  8  style-a  — top edge
  [   44,    3  ],  //  9  style-b  — top edge
  [   64,    5  ],  // 10  style-a  — top edge
  [   83,    4  ],  // 11  style-b  — top edge
  [   18,   94  ],  // 12  style-b  — bottom edge
  [   42,   96  ],  // 13  style-a  — bottom edge
  [   62,   95  ],  // 14  style-b  — bottom edge
  [   80,   93  ],  // 15  style-a  — bottom edge
  [   13,   22  ],  // 16  style-b  — left col upper
  [   87,   45  ],  // 17  style-a  — right col mid
  [   30,   28  ],  // 18  style-b  — center scatter
  [   55,   35  ],  // 19  style-a  — center scatter
  [   72,   52  ],  // 20  style-b  — center scatter
  [   38,   62  ],  // 21  style-a  — center scatter
  [   25,   75  ],  // 22  style-b  — center scatter
  [   65,   78  ],  // 23  style-a  — center scatter
  [   48,   48  ],  // 24  style-b  — dead center
  [   33,   45  ],  // 25  style-a  — center-left
  [   60,   65  ],  // 26  style-b  — center-right lower
];

const TYPES = [
  'style-a', 'style-b', 'style-a', 'style-b',
  'style-a', 'style-b', 'style-a', 'style-b',
  'style-a', 'style-b', 'style-a', 'style-b',
  'style-b', 'style-a', 'style-b', 'style-a',
  'style-b', 'style-a', 'style-b', 'style-a',
  'style-b', 'style-a', 'style-b', 'style-a',
  'style-b', 'style-a', 'style-b',
];

function layoutFlowers() {
  const sizeOptions = [4, 8, 12];
  const colors = ['rgba(223, 147, 133, 0.7)', 'rgba(232, 149, 51, 0.7)'];

  flowers.forEach((flower, i) => {
    if (i >= POSITIONS.length) return;
    const [left, top] = POSITIONS[i];
    const size = sizeOptions[i % sizeOptions.length];
    const initialRotation = (i % 5) * 12 - 24;

    flower.style.display         = 'inline-block';
    flower.style.left            = `${left}%`;
    flower.style.top             = `${top}%`;
    flower.style.width           = `${size}rem`;
    flower.style.height          = `${size}rem`;
    flower.style.fontSize        = `${size}rem`;
    flower.style.lineHeight      = '1';
    flower.style.textAlign       = 'center';
    flower.style.transform       = `rotate(${initialRotation}deg)`;
    flower.style.transformOrigin = 'center center';
    flower.style.color           = colors[i % colors.length];

    flower.classList.remove('style-a', 'style-b');
    flower.classList.add(TYPES[i]);

    flowerData.push({
      initialRotation,
      scrollSensitivity: 0.2 + (i % 3) * 0.1,
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
    flower.style.transform       = `rotate(${totalRotation}deg)`;
    flower.style.transformOrigin = 'center center';
  });
});

// FAQ toggle
const faqCards = document.querySelectorAll('.faq-card');
faqCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('open');
  });
});