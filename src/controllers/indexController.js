const db = require("../database/models");
const Product = require('../tools/Productos');

const controller = {
    index: async function (req, res) {
        try {
            const allProducts = await db.Product.findAll({ include: [{ association: 'tiene_una_category' }] });
            res.render('index', { allProducts });
        } catch (error) {
            console.log(error);
            handleError(res, 'Error al cargar la vista de index', 500);
        }

    }
}

module.exports = controller;