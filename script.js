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
