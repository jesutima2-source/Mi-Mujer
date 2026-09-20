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

  // Generador dinámico de copos blancos flotantes
  const container = document.getElementById('particulasContainer');
  const numParticulas = 35;
  for (let i = 0; i < numParticulas; i++) {
    const p = document.createElement('div');
    p.classList.add('particula');
    
    // Tamaños y posiciones aleatorias para los copos
    const size = Math.random() * 6 + 3; // entre 3px y 9px
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}vw`;
    
    // Animación personalizada de duración y retraso
    const duration = Math.random() * 7 + 5; // entre 5s y 12s
    const delay = Math.random() * 5;
    p.style.animationDuration = `${duration}s`;
    p.style.animationDelay = `${delay}s`;
    
    container.appendChild(p);
  }
});

// ================= LÓGICA DE LA LÁMPARA Y FÍSICAS DE LA PITA =================
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
let currentY = 22;
const originX = 50;
const originY = 0;
const maxPullDistance = 55;

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

  let pullDistance = Math.sqrt(Math.pow(currentX - originX, 2) + Math.pow(currentY - 22, 2));

  if (pullDistance > 18) {
    toggleLamp();
  }

  // Efecto resorte de retorno al centro
  let returnInterval = setInterval(() => {
    currentX += (originX - currentX) * 0.2;
    currentY += (22 - currentY) * 0.2;
    updateCord(currentX, currentY);

    if (Math.abs(currentX - originX) < 0.5 && Math.abs(currentY - 22) < 0.5) {
      currentX = originX;
      currentY = 22;
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

// ================= VALIDACIÓN Y ENRUTAMIENTO =================
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userVal = usernameInput.value.trim().toLowerCase();
  const passVal = passwordInput.value.trim();

  const isValid = validUsers.some(u => u.user === userVal && u.pass === passVal);

  if (isValid) {
    window.location.href = "central/rincon.html"; 
  } else {
    alert("Usuario ou contraseña incorrectos, amor. Inténtalo de nuevo.");
  }
});
