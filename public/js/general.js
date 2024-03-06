let enviandoCarrito = false;
/* Open the sidenav */
function openNav() {
    document.querySelector('.nav-bar-mobile').style.width = "100%";
}

/* Close/hide the sidenav */
function closeNav() {
    document.querySelector('.nav-bar-mobile').style.width = "0";
}

// Función para alternar la visibilidad del submenú en la barra de navegación móvil
function toggleSubMenu(elementoLi) {
    const submenuItems = elementoLi.querySelector('.submenu-items');
    submenuItems.style.display = (getComputedStyle(submenuItems).display === 'none') ? 'flex' : 'none';
}

// Función para eliminar una fila de la tabla del carrito
async function eliminarItemCarrito(boton, item) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(elemento => elemento.id != item);
    guardarCarrito(carrito);

    //Borro la fila de la tabla
    const fila = boton.closest('tr');
    fila.remove();

    //Actualizo el total en la tabla
    const totalElemento = document.querySelector('#tabla-total')
    const filas = document.querySelector('tbody').querySelectorAll('tr');
    const total = '$' + [...filas].map(filaT => Number(filaT.querySelector('td:nth-child(5)').textContent.slice(1)))
        .reduce((acum, cantidad) => acum += cantidad, 0).toFixed(2);
    totalElemento.textContent = total;
    actualizarCantidadCarrito();
    try {
        await mandarCarritoaServer();
    } catch (error) {
        console.error('Error con el carrito:', error);
    }
    isTablaVacia();
}

// Función para obtener el total de items en el carrito
function totalItemsCarrito() {
    const carrito = obtenerCarrito();
    return carrito.reduce((acum, elemento) => acum += elemento.cant, 0);
}

// Función para actualizar la cantidad en el badge del carrito
function actualizarCantidadCarrito() {
    if (localStorage.getItem('cart')) {
        const longitud = totalItemsCarrito();
        const badgeText = (longitud > 99) ? '+99' : longitud;
        actualizarBadge('.cart-badge-desktop', badgeText);
        actualizarBadge('.cart-badge-mobile', badgeText);
        actualizarBadge('.cart-badge-mobile-list', badgeText);
    }
}

// Función para actualizar el contenido del badge
function actualizarBadge(selector, texto) {
    document.querySelector(selector).textContent = texto;
}

// Función para cambiar entre las opciones de compra
function toggleCompra(opcion) {
    const contenedorBotones = document.querySelector('.contenedor-botones');
    const btnPrimeraCompra = document.querySelector('#primeraCompra');

    switch (opcion) {
        case 0:
            contenedorBotones.removeAttribute('hidden');
            btnPrimeraCompra.hidden = true;
            break;
        case 1:
            contenedorBotones.hidden = true;
            btnPrimeraCompra.removeAttribute('hidden');
            break;
    }
}

// Función para mantener los botones de compra en la vista de detalle de productos
function mantenerBotones() {
    if (location.href.includes('products/detail')) {
        const carrito = obtenerCarrito();
        const producto = carrito.find(elemento => elemento.id == location.href.split('/').pop());

        if (producto) {
            toggleCompra(0);
            document.querySelector('#cantidad-actual').textContent = producto.cant;
        } else {
            toggleCompra(1);
        }
    }
}

// Función para agregar un item/el primer item al carrito
async function agregarItemCarrito(item) {
    let carrito = obtenerCarrito();
    carrito.push({ id: item, cant: 1 });
    guardarCarrito(carrito);
    toggleCompra(0);
    try {
        await mandarCarritoaServer();
    } catch (error) {
        console.error('Error con el carrito:', error);
    }
    actualizarCantidadCarrito();
}

// Función para aumentar en 1 la cantidad de un producto del carrito
async function agregarMasItemsCarrito(boton, item) {
    let carrito = obtenerCarrito();
    const producto = carrito.find(elemento => elemento.id == item);
    producto.cant += 1;
    guardarCarrito(carrito);

    if (boton) {
        //Actualizo cantidad y subtotal en la tabla
        const fila = boton.closest('tr');
        const columnaCantidad = fila.querySelector('td:nth-child(3)');
        const columnaPrecioUnitario = fila.querySelector('td:nth-child(4)')
        const columnaSubtotal = fila.querySelector('td:nth-child(5)');
        columnaCantidad.textContent = producto.cant;
        columnaSubtotal.textContent = '$' + (producto.cant * columnaPrecioUnitario.textContent.slice(1)).toFixed(2);

        //Actualizo el total en la tabla
        const totalElemento = document.querySelector('#tabla-total')
        const filas = document.querySelector('tbody').querySelectorAll('tr');
        const total = '$' + [...filas].map(filaT => Number(filaT.querySelector('td:nth-child(5)').textContent.slice(1)))
            .reduce((acum, cantidad) => acum += cantidad, 0).toFixed(2);
        totalElemento.textContent = total;

    } else {
        document.querySelector('#cantidad-actual').textContent = producto.cant;
    }
    try {
        await mandarCarritoaServer();
    } catch (error) {
        console.error('Error con el carrito:', error);
    }
    actualizarCantidadCarrito();

}

// Función para reducir en 1 la cantidad de un producto del carrito
async function quitarItemsCarrito(boton, item) {
    let carrito = obtenerCarrito();
    const producto = carrito.find(elemento => elemento.id == item);
    let desconte = false;

    if (producto.cant == 1) {
        // Eliminar el producto del carrito si la cantidad es 1
        carrito = carrito.filter(elemento => elemento.id != item);
        if (!boton) {
            toggleCompra(1);
        }
    } else {
        // Reducir la cantidad del producto si es mayor que 1
        producto.cant -= 1;
        desconte = true;
    }

    // Actualizar el carrito en el almacenamiento local
    guardarCarrito(carrito);

    if (boton) {
        // Actualizar la tabla solo si hay un botón pasado
        // Eliminar la fila si la cantidad es 1
        if (producto.cant == 1 && !desconte) {
            const fila = boton.closest('tr');
            fila.remove();
        } else {
            // Actualizar cantidad y subtotal en la tabla si la cantidad es mayor que 1
            const fila = boton.closest('tr');
            const columnaCantidad = fila.querySelector('td:nth-child(3)');
            const columnaPrecioUnitario = fila.querySelector('td:nth-child(4)');
            const columnaSubtotal = fila.querySelector('td:nth-child(5)');
            columnaCantidad.textContent = producto.cant;
            columnaSubtotal.textContent = '$' + (producto.cant * columnaPrecioUnitario.textContent.slice(1)).toFixed(2);
        }

        // Actualizar el total en la tabla
        const totalElemento = document.querySelector('#tabla-total');
        const filas = document.querySelector('tbody').querySelectorAll('tr');
        const total = '$' + [...filas].map(filaT => Number(filaT.querySelector('td:nth-child(5)').textContent.slice(1)))
            .reduce((acum, cantidad) => acum += cantidad, 0).toFixed(2);
        totalElemento.textContent = total;
        isTablaVacia();
    }

    if (!boton) {
        document.querySelector('#cantidad-actual').textContent = producto.cant;
    }

    // Actualizar la cantidad del carrito después de actualizar la tabla y mandar carrito al Server
    try {
        await mandarCarritoaServer();
    } catch (error) {
        console.error('Error con el carrito:', error);
    }
    actualizarCantidadCarrito();

}

function escuchandoBotonesCarrito() {

    const btnsCarrito = document.querySelectorAll('.cart-click');

    btnsCarrito.forEach(boton => {
        boton.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await mandarCarritoaServer();
            } catch (error) {
                console.error('Error con el carrito:', error);
            }
            window.location.href = '/products/cart';

        })
    })

}

async function mandarCarritoaServer(inicio = null) {
    if (obtenerCarrito() && !enviandoCarrito) {
        enviandoCarrito = true;
        try {
            const carrito = obtenerCarrito();
            const response = await fetch('/products/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ carrito, unidadProducto: carrito.length, totalProductos: totalItemsCarrito(), inicio }),
            });

            if (response.ok) {
                if (response.status === 201) {
                    const data = await response.json();
                    guardarCarrito(data.carrito);
                    console.log('Contenido del carrito actualizado desde el servidor:', data.carrito);
                } else {
                    console.log('Contenido del carrito enviado exitosamente al servidor');
                }
            } else {
                console.error('Error al enviar el contenido del carrito al servidor:', response.status);
                throw new Error('Error en la solicitud al servidor');
            }
        } catch (error) {
            console.error('Error al enviar el contenido del carrito al servidor:', error);
        } finally {
            enviandoCarrito = false;
        }
    }
}
// Funciones auxiliares -------------------------------------------

// Función para obtener el carrito desde el almacenamiento local
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Función para guardar el carrito en el almacenamiento local
function guardarCarrito(carrito) {
    localStorage.setItem('cart', JSON.stringify(carrito));
}

function isTablaVacia() {
    const tbody = document.querySelector('tbody');
    if (location.href.includes('cart') && tbody && tbody.children.length == 0) {
        window.location.reload();
    }
}

async function inicioSesion() {
    if (location.href.includes('profile')) {
        if (obtenerCarrito()) {
            try {
                await mandarCarritoaServer('inicio');
            } catch (error) {
                console.error('Error con el carrito:', error);
            }
        }
        actualizarCantidadCarrito();

    }
}

function cerrarSesion() {

    const btnsCerrarSesion = document.querySelectorAll('.close-sesion');

    btnsCerrarSesion.forEach(boton => {
        boton.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await mandarCarritoaServer('cerro');
            } catch (error) {
                console.error('Error con el carrito:', error);
            }
            window.location.href = '/user/logout';

        })
    })
}

// Funciones auxiliares -------------------------------------------

//al cargarse cualquier vista nueva
window.addEventListener('load', () => {
    actualizarCantidadCarrito();
    mantenerBotones();
    escuchandoBotonesCarrito();
    inicioSesion();
    cerrarSesion();
});

//para navegacion con flechas
window.addEventListener('pageshow', () => {
    actualizarCantidadCarrito();
    mantenerBotones();
});