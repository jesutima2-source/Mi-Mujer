// ================= CONFIGURACIÓN DE LAS 3 CREDENCIALES =================
const validUsers = [
  { user: "jesus", pass: "10082018" },   // Credencial 1 (Tú)
  { user: "betzi", pass: "10082018" },   // Credencial 2 (Betzi)
  { user: "*", pass: "*" }               // Credencial 3 (Pruebas)
];

// ================= REPRODUCTOR DE MÚSICA AUTOMÁTICA =================
const audio = document.getElementById('loginAudio');
audio.volume = 0.8;

window.addEventListener('DOMContentLoaded', () => {
  audio.play().catch(err => {
    console.log("El navegador requiere interacción para reproducir audio:", err);
    document.addEventListener('click', () => {
      audio.play();
    }, { once: true });
  });
});

// ================= FONDO DE ESTRELLAS Y ESTRELLAS FUGAZES (CANVAS) =================
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Crear estrellas estáticas de fondo
const stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    alpha: Math.random(),
    speed: Math.random() * 0.02 + 0.005
  });
}

// Crear estrellas fugaces dinámicas
const shootingStars = [];
function createShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width + 200,
    y: Math.random() * (canvas.height / 2),
    length: Math.random() * 80 + 80,
    speed: Math.random() * 6 + 6,
    opacity: 1
  });
}

setInterval(createShootingStar, 1800);

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar estrellas estáticas titilando
  stars.forEach(star => {
    star.alpha += star.speed;
    if (star.alpha > 1 || star.alpha < 0.2) star.speed = -star.speed;
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  // Dibujar y mover estrellas fugaces
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 10;
  ctx.shadowColor = '#00d2ff';

  shootingStars.forEach((star, index) => {
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x - star.length, star.y + star.length);
    ctx.stroke();

    star.x -= star.speed;
    star.y += star.speed;
    star.opacity -= 0.015;

    if (star.opacity <= 0 || star.x < 0 || star.y > canvas.height) {
      shootingStars.splice(index, 1);
    }
  });

  ctx.shadowBlur = 0; // Resetear sombra
  requestAnimationFrame(animateStars);
}
animateStars();

// ================= FÍSICAS DE LA PITITA 360° =================
const lampContainer = document.getElementById('lampContainer');
const loginCard = document.getElementById('loginCard');
const cordContainer = document.getElementById('cordContainer');
const cordLine = document.getElementById('cordLine');
const cordHandle = document.getElementById('cordHandle');

let isLightOn = true;
let isDragging = false;

const originX = 50;
const originY = 0;

let currentX = 50;
let currentY = 45;
let targetX = 50;
let targetY = 45;
let velX = 0;
let velY = 0;

const springK = 0.15;
const damping = 0.82;

cordContainer.addEventListener('pointerdown', (e) => {
  isDragging = true;
  cordContainer.setPointerCapture(e.pointerId);
  updatePointerPosition(e);
  e.preventDefault();
});

cordContainer.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  updatePointerPosition(e);
});

function updatePointerPosition(e) {
  const rect = cordContainer.getBoundingClientRect();
  targetX = e.clientX - rect.left;
  targetY = e.clientY - rect.top;

  const dx = targetX - originX;
  const dy = targetY - originY;
  const dist = Math.hypot(dx, dy);
  const maxDist = 80;

  if (dist > maxDist) {
    targetX = originX + (dx / dist) * maxDist;
    targetY = originY + (dy / dist) * maxDist;
  }
}

function releaseCord() {
  if (!isDragging) return;
  isDragging = false;

  const pullDistance = Math.hypot(currentX - 50, currentY - 45);
  if (pullDistance > 25) {
    toggleLight();
  }
}

cordContainer.addEventListener('pointerup', releaseCord);
cordContainer.addEventListener('pointercancel', releaseCord);

function toggleLight() {
  isLightOn = !isLightOn;
  if (isLightOn) {
    lampContainer.classList.remove('off');
    loginCard.classList.remove('disabled'); 
  } else {
    lampContainer.classList.add('off');
    loginCard.classList.add('disabled');    
  }
}

function updatePhysics() {
  if (isDragging) {
    currentX = targetX;
    currentY = targetY;
    velX = 0;
    velY = 0;
  } else {
    const restX = 50;
    const restY = 45;

    const forceX = (restX - currentX) * springK;
    const forceY = (restY - currentY) * springK;

    velX = (velX + forceX) * damping;
    velY = (velY + forceY) * damping;

    currentX += velX;
    currentY += velY;
  }

  cordLine.setAttribute('x2', currentX);
  cordLine.setAttribute('y2', currentY);
  cordHandle.style.left = currentX + 'px';
  cordHandle.style.top = currentY + 'px';

  requestAnimationFrame(updatePhysics);
}
updatePhysics();

// ================= VALIDACIÓN DE LOGIN Y ENRUTAMIENTO CORRECTO =================
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const userInput = document.getElementById('username').value.trim().toLowerCase();
  const passInput = document.getElementById('password').value;

  const matchedUser = validUsers.find(u => u.user === userInput && u.pass === passInput);

  if (matchedUser) {
    window.location.href = "central/rincon.html";
  } else {
    alert('Usuario o contraseña incorrectos. Intenta de nuevo 💔');
  }
});
