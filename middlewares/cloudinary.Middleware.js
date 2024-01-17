const fs = require('fs');
const cloudinary = require('../tools/cloudinaryConfig');
const path = require('path');
const { validationResult } = require("express-validator");

const cloudinaryMiddleware = async (req, res, next) => {
    try {
        const file = req.file;
        let errors = validationResult(req);
        if (!file) {
            return next();
        }

        // Ruta local del archivo
        const filePath = path.join(__dirname, '../public/images/temp', file.filename);

        if (!errors.isEmpty()) {

            fs.unlink(filePath, (error) => {
                if (error) {
                    console.error(err);
                } else {
                    console.log(`Archivo eliminado: ${filePath}`);
                }
            });
            return next();
        }

        // Carga el archivo a Cloudinary utilizando el método upload
        const result = await cloudinary.uploader.upload(filePath, {
            public_id: file.filename,
            folder: 'seatech', // Carpeta en Cloudinary donde se almacenarán los archivos
            allowed_formats: ['jpg', 'png', 'jpeg'],
            //transformation: [{ width: 512, height: 512 }]
        });

        // Agrega la URL de Cloudinary al objeto req.file
        req.file.cloudinaryUrl = result.secure_url;

        fs.unlink(filePath, (error) => {
            if (error) {
                console.error(err);
            } else {
                console.log(`Archivo eliminado: ${filePath}`);
            }
        });

        // Continúa con la ejecución de la siguiente función en la cadena de middleware
        return next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al subir el archivo a Cloudinary' });
    }
};

module.exports = cloudinaryMiddleware;