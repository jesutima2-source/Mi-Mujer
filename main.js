// ================= FONDO ESTRELLADO Y NEBULOSAS =================
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const stars = Array.from({ length: 180 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 1.8 + 0.3,
  alpha: Math.random(),
  speed: Math.random() * 0.015 + 0.005
}));

function drawBackground() {
  ctx.fillStyle = '#050b14';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Nebulosas suaves de fondo
  const gradient = ctx.createRadialGradient(canvas.width * 0.5, canvas.height * 0.3, 50, canvas.width * 0.5, canvas.height * 0.3, canvas.width * 0.7);
  gradient.addColorStop(0, 'rgba(0, 100, 180, 0.12)');
  gradient.addColorStop(0.5, 'rgba(100, 30, 150, 0.06)');
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Estrellas titilantes
  stars.forEach(star => {
    star.alpha += star.speed;
    if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
    ctx.fill();
  });

  requestAnimationFrame(drawBackground);
}
drawBackground();

// ================= AUDIO DE LOGIN =================
const audio = document.getElementById('loginAudio');
const playBtn = document.getElementById('playBtn');

audio.volume = 0.8;

window.addEventListener('DOMContentLoaded', () => {
  audio.play().catch(() => {
    const unlock = () => {
      audio.play();
      playBtn.textContent = '⏸';
      window.removeEventListener('click', unlock);
    };
    window.addEventListener('click', unlock);
  });
});

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = '⏸';
  } else {
    audio.pause();
    playBtn.textContent = '▶';
  }
});

// ================= FÍSICAS DE LA PITITA Y ENCENDIDO =================
const lamp = document.getElementById('lampButton');
const cordContainer = document.getElementById('cordContainer');
const lampCord = document.getElementById('lampCord');
const cordHandle = document.getElementById('cordHandle');

let isLightOn = true;
let isDragging = false;
let startY = 0;
let currentPull = 0;

// Parámetros físicos de rebote (Resorte Hooke)
let cordVelocity = 0;
let cordOffset = 0;
const springK = 0.18;   // Rigidez del resorte
const damping = 0.82;   // Fricción / Amortiguación

cordHandle.addEventListener('pointerdown', (e) => {
  isDragging = true;
  startY = e.clientY;
  cordContainer.setPointerCapture(e.pointerId);
  e.preventDefault();
});

cordContainer.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const deltaY = e.clientY - startY;
  currentPull = Math.max(0, Math.min(deltaY, 65)); // Límite máximo de estiramiento
  cordOffset = currentPull;
});

function releaseCord() {
  if (!isDragging) return;
  isDragging = false;

  // Si se jaló lo suficiente (más de 28px), se conmuta el estado de la luz
  if (currentPull > 28) {
    toggleLight();
  }
  currentPull = 0;
}

cordContainer.addEventListener('pointerup', releaseCord);
cordContainer.addEventListener('pointercancel', releaseCord);

function toggleLight() {
  isLightOn = !isLightOn;
  if (isLightOn) {
    lamp.classList.remove('off');
  } else {
    lamp.classList.add('off');
  }
}

// También permite encender haciendo clic directamente en el cuerpo de la lámpara
lamp.addEventListener('click', (e) => {
  if (e.target === cordHandle || e.target === cordContainer || e.target === lampCord) return;
  toggleLight();
});

// Bucle de físicas del resorte para la pitita
function updatePhysics() {
  if (!isDragging) {
    // Fuerza de restitución hacia 0 (resorte)
    const force = -springK * cordOffset;
    cordVelocity += force;
    cordVelocity *= damping;
    cordOffset += cordVelocity;
  } else {
    cordOffset = currentPull;
    cordVelocity = 0;
  }

  // Actualizar elementos visuales del cordón según el estiramiento y rebote
  const cordHeight = 55 + cordOffset;
  lampCord.style.height = cordHeight + 'px';
  cordHandle.style.top = cordHeight + 'px';

  requestAnimationFrame(updatePhysics);
}
updatePhysics();

// ================= ACCIÓN DE LOGIN =================
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // Aquí puedes redirigir a tu siguiente vista o rincón mágico
  alert('¡Bienvenido a nuestro rincón, Betzi! ❤️');
});
