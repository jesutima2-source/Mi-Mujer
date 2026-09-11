document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();

  // Cambia aquí los usuarios y contraseñas que desees
  const credenciales = {
    "jesus": "1234",
    "pareja": "1234"
  };

  if (credenciales[user] && credenciales[user] === pass) {
    window.location.href = "rincon.html";
  } else {
    alert("Usuario o contraseña incorrectos ♥");
  }
});
