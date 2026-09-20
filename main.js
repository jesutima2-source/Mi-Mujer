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

// ================= FÍSICAS DE LA PITITA 360° =================
const lampContainer = document.getElementById('lampContainer');
const loginCard = document.getElementById('loginCard');
const cordContainer = document.getElementById('cordContainer');
const cordLine = document.getElementById('cordLine');
const cordHandle = document.getElementById('cordHandle');

let isLightOn = true;
let isDragging = false;

// Centro de origen del cordón dentro del contenedor (X: 50, Y: 0)
const originX = 50;
const originY = 0;

let currentX = 50;
let currentY = 45;

let targetX = 50;
let targetY = 45;

let velX = 0;
let velY = 0;

const springK = 0.15; // Elasticidad
const damping = 0.82; // Amortiguación

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

  // Limitar distancia máxima de estiramiento (radio de 80px)
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

  // Calcular cuánto se estiró desde la posición de descanso (50, 45)
  const pullDistance = Math.hypot(currentX - 50, currentY - 45);
  
  // Si se jaló lo suficiente (más de 25 píxeles), conmuta el estado
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

// Bucle de físicas de resorte bidimensional (360 grados)
function updatePhysics() {
  if (isDragging) {
    currentX = targetX;
    currentY = targetY;
    velX = 0;
    velY = 0;
  } else {
    // Fuerza de resorte hacia el punto de descanso (50, 45)
    const restX = 50;
    const restY = 45;

    const forceX = (restX - currentX) * springK;
    const forceY = (restY - currentY) * springK;

    velX = (velX + forceX) * damping;
    velY = (velY + forceY) * damping;

    currentX += velX;
    currentY += velY;
  }

  // Actualizar línea SVG y posición de la bolita
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
    // Enrutamiento correcto desde la carpeta universos hacia central/rincon.html
    window.location.href = "../central/rincon.html";
  } else {
    alert('Usuario o contraseña incorrectos. Intenta de nuevo 💔');
  }
});
