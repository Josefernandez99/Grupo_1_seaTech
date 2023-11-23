const controller = {
    cart: function (req, res) {
        res.render('./products/cart');
    },
    productDetail: function (req, res) {
        res.render('./products/productDetail');
    },
    productAdd: function (req, res) {
        res.render('./products/productAdd');
    }
}

module.exports = controller;