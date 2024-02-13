const getProvincias = require('./provincias');
const bcriptjs = require("bcryptjs");

const handleExistingUser = async (req, res) => {
    let oldBody = req.body;
    delete oldBody.password;
    const errors = { email: { msg: 'El email ya se encuentra en uso' } };

    const provincias = await getProvincias();
    res.render("./users/register", { errors, oldBody, provincias });
};

const hashPasswordAndFormatData = (req) => {
    req.body.password = bcriptjs.hashSync(req.body.password, 10);
    req.body.telefono = `+54 9 ${req.body.telefono}`;
};

const handleError = (res, message, statusCode) => {
    res.status(statusCode).json({ error: message });
};

const formatDataProduct = (req) => {
    req.body.price = Number(req.body.price);
    req.body.year = Number(req.body.year);
};

module.exports = { handleExistingUser, hashPasswordAndFormatData, handleError, formatDataProduct };