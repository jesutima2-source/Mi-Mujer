const cord = document.getElementById('lamp-cord');
const loginCard = document.getElementById('login-card');

cord.addEventListener('click', () => {
  document.body.classList.toggle('light-on');
  loginCard.classList.toggle('hidden');
});

// Credenciales para ambos
const users = {
  "jesus": "2109",  // Modifica tus credenciales
  "mi_amor": "2109"
};

function login() {
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  const error = document.getElementById('error-msg');

  if (users[u] && users[u] === p) {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-menu').classList.add('active');
  } else {
    error.textContent = "Credenciales incorrectas ❤️";
  }
}
function createPetal() {
  const container = document.getElementById('flowers-screen');
  const petal = document.createElement('div');
  petal.classList.add('petal');
  
  // Mensajes aleatorios que aparecen al hacer clic o caer
  const messages = ["Te amo", "Eres mi lugar seguro", "Lima & Huancayo 💖", "21 de Setiembre"];
  petal.innerText = messages[Math.floor(Math.random() * messages.length)];
  
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.animationDuration = Math.random() * 3 + 2 + 's';
  
  container.appendChild(petal);
  
  setTimeout(() => {
    petal.remove();
  }, 5000);
}

// Generar pétalos continuamente
setInterval(createPetal, 600);
