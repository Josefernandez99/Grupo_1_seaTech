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

function addUrlCloudinary(file, result) {
    file.cloudinaryUrl = result.secure_url;
    file.public_id = result.public_id;
}

const cloudinaryAddMiddleware = async (req, res, next) => {
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

        // Carga el archivo a Cloudinary utilizando el método upload
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'seatech', // Carpeta en Cloudinary donde se almacenarán los archivos
            allowed_formats: ['jpg', 'png', 'jpeg'],
            transformation: [{ width: 512, height: 512 }]
        });

        // Agrega la URL de Cloudinary y public_id al objeto req.file
        addUrlCloudinary(file, result);

        eliminarImg(filePath);

        // Continúa con la ejecución de la siguiente función en la cadena de middleware
        return next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al subir el archivo a Cloudinary' });
    }
};

const cloudinaryUpdateMiddleware = async (req, res, next) => {
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

        // Carga el archivo a Cloudinary utilizando el método upload
        const result = await cloudinary.uploader.upload(filePath, {
            public_id: req.body.idImagenAntesDeActualizar,
            invalidate: true,
            overwrite: true,
            //transformation: [{ width: 512, height: 512 }]
        });

        // Agrega la URL de Cloudinary y public_id al objeto req.file
        addUrlCloudinary(file, result);

        eliminarImg(filePath);
        // Continúa con la ejecución de la siguiente función en la cadena de middleware
        return next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al subir el archivo a Cloudinary' });
    }
};



module.exports = { cloudinaryAddMiddleware, cloudinaryUpdateMiddleware };