// window.addEventListener('DOMContentLoaded', () => {

//     //Validación en tiempo real

//     const inputs = document.querySelectorAll('input');
//     const soloLetras = ['firstName', 'lastName'];
//     const regexTexto = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
//     const regexNumeros = /[^0-9]+$/;

//     inputs.forEach(input => {

//         input.addEventListener('input', (e) => {
//             console.log(e);

//             if (e.target.name == 'telefono') {

//                 const numeroTelefono = e.target.value;

//                 const caracteresNoPermitidos = numeroTelefono.match(regexNumeros);

//                 if (caracteresNoPermitidos) {
//                     caracteresNoPermitidos.forEach(caracter => {
//                         e.target.value = numeroTelefono.replace(caracter, '');
//                     })
//                 }

//             }

//             if (soloLetras.includes(e.target.name)) {

//                 const texto = e.target.value;

//                 const caracteresNoPermitidos = texto.match(regexTexto);

//                 if (caracteresNoPermitidos) {
//                     caracteresNoPermitidos.forEach(caracter => {
//                         e.target.value = texto.replace(caracter, '');
//                     })
//                 }
//             }

//         })

//     })

//     //Validación al enviar el formulario





// })

// function msgError() {

// }