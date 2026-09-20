// ================= CONFIGURACIÓN DE CREDENCIALES =================
const validUsers = [
  { user: "jesus", pass: "10082018" },
  { user: "betzi", pass: "10082018" },
  { user: "*", pass: "*" }
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

// ================= FONDO DE ESTRELLAS Y PARTÍCULAS (CANVAS) =================
const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.8,
    alpha: Math.random(),
    speed: Math.random() * 0.015 + 0.005
  });
}

const shootingStars = [];
function createShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width + 200,
    y: Math.random() * (canvas.height / 2),
    length: Math.random() * 80 + 60,
    speed: Math.random() * 6 + 4,
    opacity: 1
  });
}
setInterval(createShootingStar, 3000);

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.alpha += star.speed;
    if (star.alpha > 1 || star.alpha < 0.15) star.speed = -star.speed;
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 12;
  ctx.shadowColor = '#00d2ff';

  shootingStars.forEach((star, index) => {
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x - star.length, star.y + star.length * 0.4);
    ctx.stroke();

    star.x -= star.speed;
    star.y += star.speed * 0.4;
    star.opacity -= 0.012;

    if (star.opacity <= 0 || star.x < 0) {
      shootingStars.splice(index, 1);
    }
  });

  ctx.shadowBlur = 0;
  requestAnimationFrame(animateStars);
}
animateStars();

// ================= LÓGICA DE LA LÁMPARA Y FÍSICAS MULTIDIRECCIONALES =================
const lampContainer = document.getElementById('lampContainer');
const loginCard = document.getElementById('loginCard');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.querySelector('.login-btn');

const cordContainer = document.getElementById('cordContainer');
const cordLine = document.getElementById('cordLine');
const cordHandle = document.getElementById('cordHandle');

let isDragging = false;
let currentX = 50;
let currentY = 45;
const originX = 50;
const originY = 0;
const maxPullDistance = 75;

function updateCord(x, y) {
  cordLine.setAttribute('x2', x);
  cordLine.setAttribute('y2', y);
  cordHandle.style.left = x + 'px';
  cordHandle.style.top = y + 'px';
}

cordContainer.addEventListener('pointerdown', (e) => {
  isDragging = true;
  cordContainer.setPointerCapture(e.pointerId);
});

cordContainer.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const rect = cordContainer.getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  let mouseY = e.clientY - rect.top;

  let dx = mouseX - originX;
  let dy = mouseY - originY;
  let distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > maxPullDistance) {
    dx = (dx / distance) * maxPullDistance;
    dy = (dy / distance) * maxPullDistance;
  }

  currentX = originX + dx;
  currentY = originY + dy;
  updateCord(currentX, currentY);
});

cordContainer.addEventListener('pointerup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  cordContainer.releasePointerCapture(e.pointerId);

  let pullDistance = Math.sqrt(Math.pow(currentX - originX, 2) + Math.pow(currentY - 45, 2));

  // Si se jaló lo suficiente en cualquier dirección
  if (pullDistance > 28) {
    toggleLamp();
  }

  // Efecto resorte de retorno al centro (suave)
  let returnInterval = setInterval(() => {
    currentX += (originX - currentX) * 0.2;
    currentY += (45 - currentY) * 0.2;
    updateCord(currentX, currentY);

    if (Math.abs(currentX - originX) < 0.5 && Math.abs(currentY - 45) < 0.5) {
      currentX = originX;
      currentY = 45;
      updateCord(currentX, currentY);
      clearInterval(returnInterval);
    }
  }, 15);
});

function toggleLamp() {
  lampContainer.classList.toggle('off');
  const isOff = lampContainer.classList.contains('off');

  if (isOff) {
    loginCard.classList.add('disabled');
    usernameInput.disabled = true;
    passwordInput.disabled = true;
    loginBtn.disabled = true;
  } else {
    loginCard.classList.remove('disabled');
    usernameInput.disabled = false;
    passwordInput.disabled = false;
    loginBtn.disabled = false;
  }
}

// ================= VALIDACIÓN Y ENRUTAMIENTO CORRECTO =================
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userVal = usernameInput.value.trim().toLowerCase();
  const passVal = passwordInput.value.trim();

  const isValid = validUsers.some(u => u.user === userVal && u.pass === passVal);

  if (isValid) {
    // ENRUTAMIENTO SOLICITADO
    window.location.href = "central/rincon.html"; 
  } else {
    alert("Usuario o contraseña incorrectos, amor. Inténtalo de nuevo.");
  }
});
