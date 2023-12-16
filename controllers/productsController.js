const controller = {
    cart: function (req, res) {
        res.render('./products/cart');
    },
    productDetail: function (req, res) {
        res.render('./products/productDetail');
    },
    productAdd: function (req, res) {
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