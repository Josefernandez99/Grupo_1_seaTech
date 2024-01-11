const multer = require('multer');
const path = require('path');

const storageProducts = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/productos');
    },
    filename: function (req, file, cb) {
        let name = `${Date.now()}-img-${file.originalname}`;
        cb(null, name);
    }
});

const uploadProducts = multer({
    storage: storageProducts
});

const storageUsers = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
        let name = `${Date.now()}-img-${file.originalname}.${path.extname(file.originalname)}`;
        cb(null, name);
    }
});

const uploadUsers = multer({
    storage: storageUsers
});

module.exports = { uploadProducts, uploadUsers };