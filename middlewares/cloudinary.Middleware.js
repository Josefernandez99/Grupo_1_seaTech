const fs = require('fs');
const cloudinary = require('../tools/cloudinaryConfig');
const path = require('path');
const { validationResult } = require("express-validator");

function eliminarImg(filePath) {
    fs.unlink(filePath, (error) => {
        if (error) {
            return console.error(err);
        }
        return console.log(`Archivo eliminado: ${filePath}`);
    });
}

function addPropertiesCloudinary(file, result) {
    file.cloudinaryUrl = result.secure_url;
    file.public_id = result.public_id;
}

const cloudinaryMiddleware = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        const file = req.file;

        if (!file) {
            return next();
        }

        // Ruta local del archivo
        const filePath = path.join(__dirname, '../public/images/temp', file.filename);

        if (!errors.isEmpty()) {
            eliminarImg(filePath);
            return next();
        }

        const options = {};

        if (req.body.idImagenAntesDeActualizar) {
            //actualizar la imagen de un producto
            options.public_id = req.body.idImagenAntesDeActualizar
            options.invalidate = true
            options.overwrite = true

        } else {
            //subir la imagen a cloudinary del producto creado
            options.folder = 'seatech'
            options.allowed_formats = ['jpg', 'png', 'jpeg']
        }

        options.transformation = [{ width: 512, height: 512 }]

        // Carga/Actualiza la imagen en Cloudinary utilizando el método upload
        const result = await cloudinary.uploader.upload(filePath, options);

        // Agrega la URL de Cloudinary y public_id al objeto req.file
        addPropertiesCloudinary(file, result);

        eliminarImg(filePath);

        // Continúa con la ejecución de la siguiente función en la cadena de middleware
        return next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al subir el archivo a Cloudinary' });
    }
};

module.exports = { cloudinaryMiddleware };