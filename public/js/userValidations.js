// Función para validar el nombre
function validarNombre() {
    const nombreInput = document.querySelector('input[name="firstName"]');
    const nombreError = document.getElementById('firstNameError');
    const nombre = nombreInput.value.trim();
    if (nombre.length < 2) {
        nombreError.textContent = 'El nombre debe tener al menos 2 caracteres';
        nombreInput.classList.add('error');
        nombreError.classList.add('error');
        return false;
    } else {
        nombreError.textContent = '';
        nombreInput.classList.remove('error');
        nombreError.classList.remove('error');
        return true;
    }
}

// Función para validar el apellido
function validarApellido() {
    const apellidoInput = document.querySelector('input[name="lastName"]');
    const apellidoError = document.getElementById('lastNameError');
    const apellido = apellidoInput.value.trim();
    if (apellido.length < 2) {
        apellidoError.textContent = 'El apellido debe tener al menos 2 caracteres';
        apellidoInput.classList.add('error');
        apellidoError.classList.add('error');
        return false;
    } else {
        apellidoError.textContent = '';
        apellidoInput.classList.remove('error');
        apellidoError.classList.remove('error');
        return true;
    }
}

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
    if (password.length < 8) {
        passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres';
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

// Función para validar la imagen
function validarImagen() {
    const imageInput = document.querySelector('input[name="image"]');
    const imageError = document.getElementById('imageError');
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileName = imageInput.value.toLowerCase();
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (!extension && location.href.includes('register')) {
        return true;
    }
    if (!allowedExtensions.includes(extension)) {
        imageError.textContent = 'El archivo debe ser una imagen (JPG, JPEG, PNG o GIF)';
        imageInput.classList.add('error');
        imageError.classList.add('error');
        return false;
    } else {
        imageError.textContent = '';
        imageInput.classList.remove('error');
        imageError.classList.remove('error');
        return true;
    }
}

// Eventos de cambio para cada campo
document.querySelector('input[name="firstName"]').addEventListener('input', validarNombre);
document.querySelector('input[name="lastName"]').addEventListener('input', validarApellido);
document.querySelector('input[name="email"]').addEventListener('input', validarEmail);
document.querySelector('input[name="password"]').addEventListener('input', validarPassword);
document.querySelector('input[name="image"]').addEventListener('change', validarImagen);

// Evento de envío del formulario
document.getElementById('registroForm').addEventListener('submit', function(event) {
    const validNombre = validarNombre();
    const validApellido = validarApellido();
    const validEmail = validarEmail();
    const validPassword = validarPassword();
    const validImagen = validarImagen();

    // Evita el envío del formulario si algún campo no es válido
    if (!validNombre || !validApellido || !validEmail || !validPassword || !validImagen) {
        event.preventDefault();
    }
});