// ================= CONFIGURACIÓN DE LAS 3 CREDENCIALES =================
const validUsers = [
  { user: "jesus", pass: "10082018" },   // Credencial 1 (Tú)
  { user: "betzi", pass: "10082018" },   // Credencial 2 (Betzi)
  { user: "*", pass: "*" }               // Credencial 3 (Pruebas)
];

// ================= REPRODUCTOR DE MÚSICA AUTOMÁTICA =================
const audio = document.getElementById('loginAudio');
audio.volume = 0.8;

// Intentar reproducir automáticamente al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  audio.play().catch(err => {
    console.log("El navegador requiere una interacción para reproducir audio:", err);
    // Reproducir en cuanto el usuario haga clic en cualquier parte de la página
    document.addEventListener('click', () => {
      audio.play();
    }, { once: true });
  });
});

// ================= FÍSICAS DE LA PITITA Y ENCENDIDO/APAGADO =================
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
const springK = 0.2;   
const damping = 0.8;   

cordContainer.addEventListener('pointerdown', (e) => {
  isDragging = true;
  startY = e.clientY;
  cordContainer.setPointerCapture(e.pointerId);
  e.preventDefault();
});

cordContainer.addEventListener('pointermove', (e) => {
  if (!isDragging) return;
  const deltaY = e.clientY - startY;
  currentPull = Math.max(0, Math.min(deltaY, 60)); 
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
    loginCard.classList.remove('disabled'); 
  } else {
    lampContainer.classList.add('off');
    loginCard.classList.add('disabled');    
  }
}

// Bucle de animación de físicas del resorte para la pitita
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

// ================= VALIDACIÓN DE LOGIN Y REDIRECCIÓN =================
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const userInput = document.getElementById('username').value.trim().toLowerCase();
  const passInput = document.getElementById('password').value;

  // Verificamos si coincide con alguna de las 3 credenciales
  const matchedUser = validUsers.find(u => u.user === userInput && u.pass === passInput);

  if (matchedUser) {
    // Redirige correctamente a rincon.html en la misma ruta
    window.location.href = "central/rincon.html";
  } else {
    alert('Usuario o contraseña incorrectos. Intenta de nuevo 💔');
  }
});
