const lamp = document.getElementById('lamp');
const radioOn = document.getElementById('on');
const radioOff = document.getElementById('off');

// Alternar encendido y apagado de la lámpara
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

// Validación de inicio de sesión
function handleLogin(event) {
  event.preventDefault();
  
  const usernameInput = document.getElementById('username').value.trim();
  const passwordInput = document.getElementById('password').value.trim();

  // Credenciales autorizadas
  const validUsers = {
    "jesus": "2109",
    "mi_amor": "2109"
  };

  if (validUsers[usernameInput] && validUsers[usernameInput] === passwordInput) {
    alert("¡Bienvenido/a a nuestro lugar especial! ❤️");
    // Redirección o carga del menú principal (ej. window.location.href = "menu.html";)
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}
