document.addEventListener('DOMContentLoaded', function () {
  // 1. Interacción de la lámpara (encender / apagar)
  const lamp = document.getElementById('lampButton') || document.querySelector('.lamp');
  
  if (lamp) {
    lamp.addEventListener('click', function () {
      document.body.classList.toggle('on');
    });
  }

  // 2. Validación de credenciales
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const user = document.getElementById('username').value.trim().toLowerCase();
      const pass = document.getElementById('password').value.trim();

      const credenciales = {
        "jesus": "10082018",
        "betzi": "1082018",
        "amorcito": "10082018",
        "": ""
      };

      if (credenciales[user] && credenciales[user] === pass) {
        window.location.href = "central/rincon.html";
      } else {
        alert("Usuario o contraseña incorrectos ♥");
      }
    });
  }
});
