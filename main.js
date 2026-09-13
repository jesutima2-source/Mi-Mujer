// Clic en la lámpara para encender/apagar la luz y el formulario
const lamp = document.querySelector('.lamp');
lamp.addEventListener('click', () => {
  document.body.classList.toggle('on');
});

// Validación de usuario y contraseña
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();

  // Reemplaza con tus credenciales reales
  if (user === "betzi" && pass === "2109") {
    window.location.href = "central/rincon.html";
  } else {
    alert("Usuario o contraseña incorrectos. Inténtalo de nuevo.");
  }
});
