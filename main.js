// ================= CONFIGURACIÓN DE CREDENCIALES =================
const validUsers = [
  { user: "jesus", pass: "10082018" },
  { user: "betzi", pass: "10082018" }
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
for (let i = 0; i < 200; i++) {
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
    x: Math.random() * canvas.width + 300,
    y: Math.random() * (canvas.height / 2),
    length: Math.random() * 100 + 80,
    speed: Math.random() * 7 + 5,
    opacity: 1
  });
}
setInterval(createShootingStar, 2500);

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
  ctx.shadowBlur = 15;
  ctx.shadowColor = '#00d2ff';

  shootingStars.forEach((star, index) => {
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x - star.length, star.y + star.length * 0.4);
    ctx.stroke();

    star.x -= star.speed;
    star.y += star.speed * 0.4;
    star.opacity -= 0.01;

    if (star.opacity <= 0 || star.x < 0) {
      shootingStars.splice(index, 1);
    }
  });

  ctx.shadowBlur = 0;
  requestAnimationFrame(animateStars);
}
animateStars();

// ================= LÓGICA DE LA LÁMPARA Y LA PITITA =================
const lampContainer = document.getElementById('lampContainer');
const loginCard = document.getElementById('loginCard');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.querySelector('.login-btn');

const cordContainer = document.getElementById('cordContainer');
const cordLine = document.getElementById('cordLine');
const cordHandle = document.getElementById('cordHandle');

let isDragging = false;
let startY = 0;
let currentY = 0;
const maxPull = 60;

function updateCordPosition(y) {
  cordLine.setAttribute('y2', 40 + y);
  cordHandle.style.top = (40 + y) + 'px';
}

cordContainer.addEventListener('pointerdown', (e) => {
  isDragging = true;
  startY = e.clientY;
  cordContainer.setPointerCapture(e.pointerId);
});

cordContainer.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  let deltaY = e.clientY - startY;
  currentY = Math.max(0, Math.min(deltaY, maxPull));
  updateCordPosition(currentY);
});

cordContainer.addEventListener('pointerup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  cordContainer.releasePointerCapture(e.pointerId);

  // Si se jaló lo suficiente, se enciende o apaga
  if (currentY > 30) {
    toggleLamp();
  }

  // Animación de rebote al soltar
  let returnInterval = setInterval(() => {
    currentY -= 4;
    if (currentY <= 0) {
      currentY = 0;
      updateCordPosition(0);
      clearInterval(returnInterval);
    } else {
      updateCordPosition(currentY);
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

// ================= VALIDACIÓN DE LOGIN =================
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userVal = usernameInput.value.trim().toLowerCase();
  const passVal = passwordInput.value.trim();

  const isValid = validUsers.some(u => u.user === userVal && u.pass === passVal);

  if (isValid) {
    alert("¡Bienvenido a nuestro rincón mágico, " + userVal + "!");
    // Aquí puedes redirigir a tu siguiente página, ej: window.location.href = "home.html";
  } else {
    alert("Usuario o contraseña incorrectos, amor. Inténtalo de nuevo.");
  }
});
