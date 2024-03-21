// Función para validar el nombre
function validarNombre() {
    const nombreInput = document.querySelector('input[name="name"]');
    const nombreError = document.getElementById('nombreError');
    const nombre = nombreInput.value.trim();
    if (nombre.length < 5) {
        nombreError.textContent = 'El nombre debe tener al menos 5 caracteres';
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

// Función para validar descripcion
function validarDescripcion() {
    const descripcionInput = document.querySelector('textarea[name="description"]');
    const descripcionError = document.getElementById('descripcionError');
    const descripcion = descripcionInput.value.trim();
    if (descripcion.length < 20) {
        descripcionError.textContent = 'La descripcion debe tener al menos 20 caracteres';
        descripcionInput.classList.add('error');
        descripcionError.classList.add('error');
        return false;
    } else {
        descripcionError.textContent = '';
        descripcionInput.classList.remove('error');
        descripcionError.classList.remove('error');
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
    if (!extension && location.href.includes('edit')) {
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
document.querySelector('input[name="name"]').addEventListener('input', validarNombre);
document.querySelector('textarea[name="description"]').addEventListener('input', validarDescripcion);
document.querySelector('input[name="image"]').addEventListener('change', validarImagen);

// Evento de envío del formulario
document.getElementById('productForm').addEventListener('submit', function (event) {
    const validNombre = validarNombre();
    const validDescripcion = validarDescripcion();
    const validImagen = validarImagen();

    // Evita el envío del formulario si algún campo no es válido
    if (!validNombre || !validDescripcion || !validImagen) {
        event.preventDefault();
    }
});