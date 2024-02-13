const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/temp');
    },
    filename: function (req, file, cb) {
        let name = `${Date.now()}-img-${file.originalname}`;
        cb(null, name);
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;