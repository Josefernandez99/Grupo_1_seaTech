const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
const { log } = require('console');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const cloudinaryMiddleware = async (req, res, next) => {
    try {
        const file = req.file;

        // Ruta local del archivo
        const filePath = path.join(__dirname, '../public/images/temp', file.filename);

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
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al subir el archivo a Cloudinary' });
    }
};

module.exports = cloudinaryMiddleware;