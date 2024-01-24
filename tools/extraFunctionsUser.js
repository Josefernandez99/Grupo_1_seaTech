const getProvincias = require('./provincias');

const handleValidationErrors = async (req, res, errors) => {
    let oldBody = req.body;
    errors = errors.mapped();
    delete oldBody.password;

    try {
        const provincias = await getProvincias();
        res.render("./users/register", { errors, oldBody, provincias });
    } catch (error) {
        handleError(res, 'Error al registrarse', 500);
    }
};

const handleExistingUser = async (req, res) => {
    let oldBody = req.body;
    delete oldBody.password;
    const errors = { email: { msg: 'El email ya se encuentra en uso' } };

    try {
        const provincias = await getProvincias();
        res.render("./users/register", { errors, oldBody, provincias });
    } catch (error) {
        handleError(res, 'Error al usar el método findByField', 500);
    }
};

const hashPasswordAndFormatData = (req) => {
    req.body.password = bcriptjs.hashSync(req.body.password, 10);
    req.body.telefono = `+54 9 ${req.body.telefono}`;
};

const handleError = (res, message, statusCode) => {
    res.status(statusCode).json({ error: message });
};

module.exports = { handleValidationErrors, handleExistingUser, hashPasswordAndFormatData, handleError };