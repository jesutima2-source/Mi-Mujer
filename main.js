// Clic en la lámpara para encender/apagar la luz
const lamp = document.querySelector('.lamp');
if (lamp) {
  lamp.addEventListener('click', () => {
    document.body.classList.toggle('on');
  });
}

// Redirección directa al botón de Iniciar Sesión (para pruebas rápidas)
const loginBtn = document.querySelector('.login-btn');
if (loginBtn) {
  loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = "central/flores/flower.html";
  });
}
