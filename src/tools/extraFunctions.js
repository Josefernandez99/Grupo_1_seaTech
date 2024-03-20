const getProvincias = require('./provincias');
const bcriptjs = require("bcryptjs");
const db = require("../database/models");

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

const actualizarCarritoUser = (carritoUser, carritoFront) => {

    const resultado = [...carritoUser];

    carritoFront.forEach(eCarritoFront => {

        const elementoExistente = resultado.find(eCarritoUser => eCarritoUser.id == eCarritoFront.id);

        if (elementoExistente) {
            // Si existe, actualiza la cantidad por el maximo
            elementoExistente.cant += eCarritoFront.cant;
        } else {
            // Si no existe, agrega el elemento completo al resultado
            resultado.push({ id: eCarritoFront.id, cant: eCarritoFront.cant });
        }
    });

    return resultado;


}

const almacenarCarritoEnBD = async (carrito, idUser) => {

    const transaction = await db.sequelize.transaction();

    try {
        // Eliminar registros antiguos del carrito del usuario
        await db.Cart_Item.destroy({
            where: { id_user: idUser, deletedAt: null },
            force: true,
            transaction
        });

        // Obtener información detallada de los productos del carrito
        const productosCarrito = await db.Product.findAll({
            where: {
                uuid: carrito.map(elemento => elemento.id)
            },
            transaction
        });

        // Crear nuevos registros en el carrito
        const nuevosItems = carrito.map(elemento => {
            const producto = productosCarrito.find(p => p.uuid === elemento.id);
            return {
                id_product: producto.id,
                id_user: idUser,
                subtotal: producto.price * elemento.cant,
                quantity: elemento.cant,
                unit_price: producto.price
            };
        });

        await db.Cart_Item.bulkCreate(nuevosItems, { transaction });

        // Commit de la transacción si todo fue exitoso
        await transaction.commit();
    } catch (error) {
        // Rollback en caso de error
        await transaction.rollback();
        console.log(error);
        handleError(res, 'Error al cargar el carrito en la BD', 500);
    }
}

module.exports = { handleExistingUser, hashPasswordAndFormatData, handleError, formatDataProduct, actualizarCarritoUser, almacenarCarritoEnBD };