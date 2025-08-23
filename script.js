const BALLOON_INTERVAL_MS = 1500;

const container = document.getElementById('container');
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'magenta', 'cyan', 'lime', 'turquoise', 'crimson', 'gold', 'hotpink', 'violet', 'teal', 'coral', 'fuchsia', 'limegreen', 'indigo', 'maroon'];
const shapes = {
  circle: "M 60,150 C 72,150,114,120,114,70 A 54,65,0,0,0,6,70 C 6,120,48,150,60,150",
  square: "M 60,150 C 120,150,114,150,114,70 C 114,5,120,5,60,5 C 0,5,6,5,6,70 C 6,150,0,150,60,150",
  diamond: "M 60,150 C 70,150,114,90,114,75 C 114,60,70,5,60,5 C 50,5,6,60,6,75 C 6,90,50,150,60,150",
  pentagon: "M 60,150 C 70,150,114,95,114,80 C 114,65,103,16,95,10 C 87,4,33,4,25,10 C 17,16,6,65,6,80 C 6,95,50,150,60,150",
};

let balloonShape = 'circle';

function spawnBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');

  // Random color and position
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  // 30% chance for special balloons
  const isSpecial = Math.random() < 0.3;
  let specialEmoji = '';
  let specialType = '';
  
  if (isSpecial) {
    const rand = Math.random();
    if (rand < 0.2) {
      specialEmoji = '🌈';
      specialType = 'rainbow';
    } else if (rand < 0.4) {
      specialEmoji = '🌧️';
      specialType = 'rain';
    } else if (rand < 0.55) {
      specialEmoji = '🎆';
      specialType = 'fireworks';
    } else if (rand < 0.7) {
      specialEmoji = '🔴';
      specialType = 'circle';
    } else if (rand < 0.8) {
      specialEmoji = '◼️';
      specialType = 'square';
    } else if (rand < 0.9) {
      specialEmoji = '♦️';
      specialType = 'diamond';
    } else {
      specialEmoji = '⬟';
      specialType = 'pentagon';
    }
  balloon.dataset.specialType = specialType;
  }
  
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
        <path class="string" d="M60,150 C58,170 62,190 60,210 C58,230 62,250 60,270"/>
        <!-- knot -->
        <path d="M 60,145 C 66,145,72,150,72,155 C 72,160,62,155,60,155 C 58,155,48,160,48,155 C 48,150,54,145,60,145" fill="${color}"/>
      </g>
      <g transform="scale(${scale})">
        <!-- balloon body -->
        <path d="${shapes[balloonShape]}" fill="${color}"/>
        <!-- highlight -->
        <ellipse class="highlight" cx="54" cy="60" rx="42" ry="50" fill="url(#hl)"/>
      </g>
    </svg>
    ${specialEmoji ? `<div class="special-emoji" style="top: ${scale*50}%; left: ${scale*60}%">${specialEmoji}</div>` : ''}`;
  // width is auto to maintain SVG aspect ratio and be responsive
  // Random vertical position within viewport
  const y = 5 + Math.random() * 50;
  balloon.style.top = y + 'vh';

  // Random animation duration (slower)
  const duration = 10 + Math.random() * 15; // seconds
  const wiggleDuration = 1 + Math.random() * 2; // seconds for wiggle
  balloon.style.animationDuration = duration + 's, ' + wiggleDuration + 's, 0.3s';

  // Remove balloon after it floats off screen
  balloon.addEventListener('animationend', () => {
    balloon.remove();
  });

  container.appendChild(balloon);
}

function createRainbowStreak() {
  // Pause all balloon animations
  pauseBalloonAnimations();
  
  const rainbow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  rainbow.setAttribute("viewBox", "0 0 100 40");
  rainbow.innerHTML = `
    <path class="rainbow-stroke" stroke="#70369D" d="M 11 32 A 70 70 0 0 1 89 32"/>
    <path class="rainbow-stroke" stroke="#4B369D" d="M 10 29 A 75 75 0 0 1 90 29"/>
    <path class="rainbow-stroke" stroke="#487DE7" d="M 9 26 A 80 80 0 0 1 91 26"/>
    <path class="rainbow-stroke" stroke="#79C314" d="M 8 23 A 85 85 0 0 1 92 23"/>
    <path class="rainbow-stroke" stroke="#FAEB36" d="M 7 20 A 90 90 0 0 1 93 20"/>
    <path class="rainbow-stroke" stroke="#FFA500" d="M 6 17 A 95 95 0 0 1 94 17"/>
    <path class="rainbow-stroke" stroke="#E81416" d="M 5 14 A 100 100 0 0 1 95 14"/>
  `;
  rainbow.classList.add('rainbow');
  container.appendChild(rainbow);
  
  setTimeout(() => {
    rainbow.remove();
    resumeBalloonAnimations();
  }, 3000);
}

function createRainEffect() {
  pauseBalloonAnimations();
  
  const rainContainer = document.createElement('div');
  rainContainer.classList.add('rain-effect');
  
  for (let i = 0; i < 200; i++) {
    const drop = document.createElement('div');
    drop.classList.add('rain-drop');
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.top = Math.random() * -100 - 50 + 'px';
    drop.style.animationDelay = Math.random() * 1500 + 'ms';
    drop.style.animationDuration = (1000 + Math.random() * 600) + 'ms';
    rainContainer.appendChild(drop);
  }
  
  container.appendChild(rainContainer);
  
  setTimeout(() => {
    rainContainer.remove();
    resumeBalloonAnimations();
  }, 3000);
}

function createFireworksEffect() {
  pauseBalloonAnimations();
  
  const fireworksContainer = document.createElement('div');
  fireworksContainer.classList.add('fireworks-effect');
  
  const colors = ['#FFD700', '#FF4500', '#FF1493', '#00CED1', '#32CD32', '#9400D3', '#FFFFFF'];
  const burstCount = 5;
  
  for (let burst = 0; burst < burstCount; burst++) {
    setTimeout(() => {
      const burstX = 20 + Math.random() * 60; // 20-80% across screen
      const burstY = 20 + Math.random() * 60; // 20-80% down screen
      const sparkCount = 18;
      
      for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.classList.add('firework-spark');
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (i / sparkCount) * 2 * Math.PI;
        // const distance = 100 + Math.random() * 150;
        const distance = (0.2 + Math.random() * 0.1) * window.innerWidth;
        const endX = Math.cos(angle) * distance;
        const endY = Math.sin(angle) * distance;
        
        spark.style.left = `${burstX}%`;
        spark.style.top = `${burstY}%`;
        spark.style.backgroundColor = color;
        spark.style.boxShadow = `0 0 6px ${color}`;
        spark.style.setProperty('--endX', `${endX}px`);
        spark.style.setProperty('--endY', `${endY}px`);
        spark.style.animationDelay = `${Math.random() * 0.1}s`;
        
        fireworksContainer.appendChild(spark);
      }
    }, burst * 400);
  }
  
  container.appendChild(fireworksContainer);
  
  setTimeout(() => {
    fireworksContainer.remove();
    resumeBalloonAnimations();
  }, 3000);
}

function createShapeChangeEffect(emoji, newShape) {
  pauseBalloonAnimations();
  
  const effectContainer = document.createElement('div');
  effectContainer.classList.add('shape-change-effect');
  effectContainer.innerHTML = `
    <div class="fullscreen-emoji">
      <div class="emoji-shine">
        ${emoji}
      </div>
    </div>
  `;
  
  container.appendChild(effectContainer);
  
  setTimeout(() => {
    balloonShape = newShape;
    effectContainer.remove();
    resumeBalloonAnimations();
  }, BALLOON_INTERVAL_MS);
}

function popBalloon(balloon) {
  // Play pop sound
  const popSound = document.getElementById('popSound');
  popSound.currentTime = 0;
  popSound.play();

  // Check if this balloon has special effects
  if (balloon.dataset.specialType === 'rainbow') {
    createRainbowStreak();
  } else if (balloon.dataset.specialType === 'rain') {
    createRainEffect();
  } else if (balloon.dataset.specialType === 'fireworks') {
    createFireworksEffect();
  } else if (balloon.dataset.specialType === 'circle') {
    createShapeChangeEffect('🔴', 'circle');
  } else if (balloon.dataset.specialType === 'square') {
    createShapeChangeEffect('◼️', 'square');
  } else if (balloon.dataset.specialType === 'diamond') {
    createShapeChangeEffect('♦️', 'diamond');
  } else if (balloon.dataset.specialType === 'pentagon') {
    createShapeChangeEffect('⬟', 'pentagon');
  }

  // Pop balloon
  balloon.classList.add('pop');
}

function pauseBalloonAnimations() {
  document.getElementById('container').classList.add('sfx');

  // Pause balloon creation
  if (balloonInterval) {
    clearInterval(balloonInterval);
    balloonInterval = null;
  }
}

function resumeBalloonAnimations() {
  document.getElementById('container').classList.remove('sfx');

  // Resume balloon creation
  if (!balloonInterval) {
    balloonInterval = setInterval(spawnBalloon, BALLOON_INTERVAL_MS);
  }
}

// Pop balloon only when clicking on actual SVG shapes
container.addEventListener('pointerup', (e) => {
  let onPath = false;
  for (const elt of document.elementsFromPoint(e.clientX, e.clientY)) {
    if (elt.tagName == 'path') {
      onPath = true;
    }
    if (elt.classList.contains('balloon') && onPath) {
      popBalloon(elt);
      return;
    }
  }
});

let balloonInterval = setInterval(spawnBalloon, BALLOON_INTERVAL_MS);

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
      balloonInterval = setInterval(spawnBalloon, BALLOON_INTERVAL_MS);
    }
    if (bgToggleInput.checked) {
      bgMusic.play().catch(() => {});
    }
  }
});

// Register service worker for PWA installability
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {scope: '/baloons/'})
}
