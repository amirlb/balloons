const container = document.getElementById('container');
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];

function spawnBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');

  // Random color and position
  const color = colors[Math.floor(Math.random() * colors.length)];
  // Insert SVG balloon with cone knot, highlight, and wiggly string
  balloon.innerHTML = `
    <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hl" cx="40%" cy="40%" r="40%">
          <stop offset="0%" stop-color="white" stop-opacity="0.6"/>
          <stop offset="10%" stop-color="white" stop-opacity="0.55"/>
            <stop offset="75%" stop-color="white" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="white" stop-opacity="0.0"/>
        </radialGradient>
      </defs>
      <!-- balloon body -->
      <path d="M50,5 C80,5 95,40 95,80 C95,120 70,140 50,155 C30,140 5,120 5,80 C5,40 20,5 50,5 Z M45,155 L55,155 L50,165 Z" fill="${color}"/>
      <!-- highlight -->
      <ellipse class="highlight" cx="45" cy="60" rx="35" ry="50" fill="url(#hl)"/>
      <!-- wiggly string -->
      <path class="string" d="M50,165 C48,185 52,205 50,225 C48,245 52,265 50,285"/>
    </svg>`;
  // Random size between 20vh and 30vh, and set dimensions
  const size = 20 + Math.random() * 10; // vh
  balloon.style.height = size + 'vh';
  // width is auto to maintain SVG aspect ratio and be responsive
  // Random vertical position within viewport
  const y = 5 + Math.random() * (85 - size);
  balloon.style.top = y + 'vh';
  // Start off-screen right and drift horizontally leftwards
  balloon.style.left = '102vw';

  // Random animation duration (slower)
  const duration = 20 + Math.random() * 20; // seconds
  balloon.style.animationDuration = duration + 's';

  // Remove balloon after it floats off screen
  balloon.addEventListener('animationend', () => {
    balloon.remove();
  });

  // Pop balloon on click
  balloon.addEventListener('click', () => {
    balloon.remove();
  });

  container.appendChild(balloon);
}

// Spawn a balloon every two seconds
setInterval(spawnBalloon, 2000);

// Initial balloon
spawnBalloon(); 