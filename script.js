const lamp = document.getElementById('lamp');
const radioOn = document.getElementById('on');
const radioOff = document.getElementById('off');

// Evento para prender/apagar la lámpara al dar clic
lamp.addEventListener('click', () => {
  if (document.body.classList.contains('on')) {
    document.body.classList.remove('on');
    document.body.classList.add('off');
    radioOff.checked = true;
  } else {
    document.body.classList.remove('off');
    document.body.classList.add('on');
    radioOn.checked = true;
  }
});

// Lógica de autenticación
function handleLogin(event) {
  event.preventDefault();
  
  const usernameInput = document.getElementById('username').value.trim();
  const passwordInput = document.getElementById('password').value.trim();

  const validUsers = {
    "jesus": "2109",
    "mi_amor": "2109"
  };

  if (validUsers[usernameInput] && validUsers[usernameInput] === passwordInput) {
    alert("¡Credenciales correctas! Redirigiendo...");
    // Aquí puedes cambiar de pantalla o hacer redirección:
    // window.location.href = "menu.html";
  } else {
    alert("Usuario o contraseña incorrectos ❤️");
  }
}
