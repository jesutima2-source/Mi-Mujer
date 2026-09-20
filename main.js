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

// ================= FONDO DE ESTRELLAS Y PARTÍCULAS (CANVAS) =================
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
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.8,
    alpha: Math.random(),
    speed: Math.random() * 0.015 + 0.005
  });
}

// Crear estrellas fugaces dinámicas
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

setInterval(createShootingStar, 2500); // Cada 2.5s aparece una

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar estrellas estáticas titilando
  stars.forEach(star => {
    star.alpha += star.speed;
    if (star.alpha > 1 || star.alpha < 0.15) star.speed = -star.speed;
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  // Dibujar y mover estrellas fugaces
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 15;
  ctx.shadowColor = '#00d2ff';

  shootingStars.forEach((star, index) => {
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(star.x - star.length, star.y +
