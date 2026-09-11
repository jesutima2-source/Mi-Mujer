// 1. INTERACCIÓN DE LA LÁMPARA (Encender / Apagar)
const lamp = document.querySelector('.lamp');

if (lamp) {
  lamp.addEventListener('click', function() {
    document.body.classList.toggle('on');
  });
}

// 2. VALIDACIÓN DE USUARIOS
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    // Credenciales de acceso
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
}
