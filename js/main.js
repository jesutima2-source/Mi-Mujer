document.addEventListener('DOMContentLoaded', function () {
  // 1. Interacción de la lámpara (encender / apagar)
  const lamp = document.querySelector('.lamp');
  if (lamp) {
    lamp.addEventListener('click', function () {
      document.body.classList.toggle('on');
    });
  }

  // 2. Validación de credenciales y redirección
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const user = document.getElementById('username').value.trim().toLowerCase();
      const pass = document.getElementById('password').value.trim();

      // Definición de credenciales
      const credenciales = {
        "jesus": "10082018",
        "betzi": "10082018",
        "amorcito": "10082018"
      };

      if (credenciales[user] && credenciales[user] === pass) {
        // Redirección exitosa hacia el rincón
        window.location.href = "rincon.html";
      } else {
        alert("Usuario o contraseña incorrectos ♥");
      }
    });
  }
});
