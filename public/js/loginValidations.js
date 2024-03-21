// Función para validar el email
function validarEmail() {
    const emailInput = document.querySelector('input[name="email"]');
    const emailError = document.getElementById('emailError');
    const email = emailInput.value.trim();
    // Expresión regular para validar el formato del email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = 'Ingrese un correo electrónico válido';
        emailInput.classList.add('error');
        emailError.classList.add('error');
        return false;
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('error');
        emailError.classList.remove('error');
        return true;
    }
}

// Función para validar la contraseña
function validarPassword() {
    const passwordInput = document.querySelector('input[name="password"]');
    const passwordError = document.getElementById('passwordError');
    const password = passwordInput.value;
    if (password.length == 0) {
        passwordError.textContent = 'Ingrese la contraseña';
        passwordInput.classList.add('error');
        passwordError.classList.add('error');
        return false;
    } else {
        passwordError.textContent = '';
        passwordInput.classList.remove('error');
        passwordError.classList.remove('error');
        return true;
    }
}

document.querySelector('input[name="email"]').addEventListener('input', validarEmail);
document.querySelector('input[name="password"]').addEventListener('input', validarPassword);

// Evento de envío del formulario
document.getElementById('loginForm').addEventListener('submit', function(event) {
    const validEmail = validarEmail();
    const validPassword = validarPassword();
    
    // Evita el envío del formulario si algún campo no es válido
    if (!validEmail || !validPassword) {
        event.preventDefault();
    }
});