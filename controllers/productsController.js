const controller = {
    cart: function (req, res) {
        res.render('./products/cart');
    },
    detail: function (req, res) {
        res.render('./products/productDetail');
    },
    add: function (req, res) {
        res.render('./products/productAdd');
    },
    edit: function (req, res) {

        res.render('./products/productEdit');
    },
    list: function (req, res) {
        res.render('./products/listaProductos');
    }
}

module.exports = controller;