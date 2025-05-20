const container = document.getElementById('container');
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'magenta', 'cyan', 'lime', 'turquoise', 'crimson', 'gold', 'hotpink', 'violet', 'teal', 'coral', 'fuchsia', 'limegreen', 'indigo', 'maroon'];

function spawnBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');

  // Random color and position
  const color = colors[Math.floor(Math.random() * colors.length)];
  // Insert SVG balloon with cone knot, highlight, and wiggly string
  const scale = 0.7 + Math.random() * 0.3;
  balloon.innerHTML = `
    <svg viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hl" cx="40%" cy="40%" r="40%">
          <stop offset="0%" stop-color="white" stop-opacity="0.6"/>
          <stop offset="10%" stop-color="white" stop-opacity="0.55"/>
          <stop offset="75%" stop-color="white" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="white" stop-opacity="0.0"/>
        </radialGradient>
      </defs>
      <g transform="translate(${(scale-1) * 50}, ${(scale-1) * 150})">
        <!-- wiggly string -->
        <path class="string" d="M50,150 C48,170 52,190 50,210 C48,230 52,250 50,270"/>
        <!-- knot -->
        <path d="M 50,145 C 55,145,60,150,60,155 C 60,160,52,155,50,155 C 48,155,40,160,40,155 C 40,150,45,145,50,145" fill="${color}"/>
      </g>
      <g transform="scale(${scale})">
        <!-- balloon body -->
        <path d="M 50,150 C 60,150,95,120,95,70 A 45,65,0,0,0,5,70 C 5,120,40,150,50,150" fill="${color}"/>
        <!-- highlight -->
        <ellipse class="highlight" cx="45" cy="60" rx="35" ry="50" fill="url(#hl)"/>
      </g>
    </svg>`;
  // width is auto to maintain SVG aspect ratio and be responsive
  // Random vertical position within viewport
  const y = 5 + Math.random() * 50;
  balloon.style.top = y + 'vh';

  // Random animation duration (slower)
  const duration = 20 + Math.random() * 20; // seconds
  balloon.style.animationDuration = duration + 's';

  // Remove balloon after it floats off screen
  balloon.addEventListener('animationend', () => {
    balloon.remove();
  });

  // Pop balloon only when clicking on actual SVG shapes
  balloon.addEventListener('mouseup', (e) => {
    // Play pop sound
    const popSound = document.getElementById('popSound');
    if (popSound) {
      popSound.currentTime = 0;
      popSound.play();
    }
    // Freeze current position by capturing bounding box and applying inline styles
    const rect = balloon.getBoundingClientRect();
    balloon.style.left = rect.left + 'px';
    balloon.style.top = rect.top + 'px';
    // Pop balloon
    balloon.classList.add('pop');
  });

  container.appendChild(balloon);
}

// Spawn a balloon every two seconds
let balloonInterval = setInterval(spawnBalloon, 2000);

// Initial balloon
spawnBalloon();

// Background music toggle switch
const bgMusic = document.getElementById('bgMusic');
const bgToggleInput = document.getElementById('bgMusicToggle');
// Toggle music on change
bgMusic.play().then(() => {
  bgToggleInput.checked = true;
});
bgToggleInput.addEventListener('change', () => {
  if (bgToggleInput.checked) {
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
});
// Pause/resume on visibility change
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(balloonInterval);
    balloonInterval = null;
    if (!bgMusic.paused) bgMusic.pause();
  } else {
    if (balloonInterval === null) {
      balloonInterval = setInterval(spawnBalloon, 2000);
    }
    if (bgToggleInput.checked) {
      bgMusic.play().catch(() => {});
    }
  }
});

// Register service worker for PWA installability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .catch(err => console.error('Service Worker registration failed:', err));
  });
}
