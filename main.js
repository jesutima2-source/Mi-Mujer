// ================= CONFIGURACIÓN DE LAS 2 CREDENCIALES =================
// Puedes cambiar los usuarios y contraseñas aquí mismo cuando gustes:
const validUsers = [
  { user: "betzi", pass: "12345" },       // Credencial 1
  { user: "*", pass: "*" }   // Credencial 2
];

// ================= REPRODUCTOR DE MÚSICA =================
const audio = document.getElementById('loginAudio');
const playBtn = document.getElementById('playBtn');

audio.volume = 0.8;

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().then(() => {
      playBtn.textContent = '⏸';
    }).catch(err => {
      console.log("Error al reproducir audio:", err);
    });
  } else {
    audio.pause();
    playBtn.textContent = '▶';
  }
});

// ================= FÍSICAS DE LA PITITA Y ENCENDIDO =================
const lampContainer = document.getElementById('lampContainer');
const loginCard = document.getElementById('loginCard');
const cordContainer = document.getElementById('cordContainer');
const lampCord = document.getElementById('lampCord');
const cordHandle = document.getElementById('cordHandle');

let isLightOn = true;
let isDragging = false;
let startY = 0;
let currentPull = 0;

// Variables de físicas de resorte (Hooke)
let cordVelocity = 0;
let cordOffset = 0;
const springK = 0.2;   // Rigidez del resorte
const damping = 0.8;   // Amortiguación de rebote

cordContainer.addEventListener('pointerdown', (e) => {
  isDragging = true;
  startY = e.clientY;
  cordContainer.setPointerCapture(e.pointerId);
  e.preventDefault();
});

cordContainer.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const deltaY = e.clientY - startY;
  currentPull = Math.max(0, Math.min(deltaY, 60)); // Límite de estiramiento
  cordOffset = currentPull;
});

function releaseCord() {
  if (!isDragging) return;
  isDragging = false;

  // Si se jaló más de 25 píxeles, conmuta el estado de la luz
  if (currentPull > 25) {
    toggleLight();
  }
  currentPull = 0;
}

cordContainer.addEventListener('pointerup', releaseCord);
cordContainer.addEventListener('pointercancel', releaseCord);

function toggleLight() {
  isLightOn = !isLightOn;
  if (isLightOn) {
    lampContainer.classList.remove('off');
    loginCard.classList.remove('disabled'); // Habilita escritura en el login
  } else {
    lampContainer.classList.add('off');
    loginCard.classList.add('disabled');    // Apaga y bloquea la escritura
  }
}

// Permite encender/apagar también haciendo clic directo en el foco
lampContainer.addEventListener('click', (e) => {
  if (e.target.closest('#cordContainer')) return; // Evita conflicto con el arrastre de la pita
  toggleLight();
});

// Bucle de animación de físicas del resorte
function updatePhysics() {
  if (!isDragging) {
    const force = -springK * cordOffset;
    cordVelocity += force;
    cordVelocity *= damping;
    cordOffset += cordVelocity;
  } else {
    cordOffset = currentPull;
    cordVelocity = 0;
  }

  const cordHeight = 45 + cordOffset;
  lampCord.style.height = cordHeight + 'px';
  cordHandle.style.top = cordHeight + 'px';

  requestAnimationFrame(updatePhysics);
}
updatePhysics();

// ================= VALIDACIÓN DE LOGIN =================
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const userInput = document.getElementById('username').value.trim();
  const passInput = document.getElementById('password').value;

  // Verificamos si coincide con alguna de las 2 credenciales
  const matchedUser = validUsers.find(u => u.user === userInput && u.pass === passInput);

  if (matchedUser) {
    alert('¡Acceso concedido! Bienvenido a nuestro rincón mágico ❤️');
    // Aquí puedes redirigir a tu página principal, por ejemplo:
    // window.location.href = "principal.html";
  } else {
    alert('Usuario o contraseña incorrectos. Intenta de nuevo 💔');
  }
});
