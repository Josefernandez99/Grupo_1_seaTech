const controller = {
    cart: function (req, res) {
        res.render('./products/cart');
    },
    productDetail: function (req, res) {
        res.render('./products/productDetail');
    }
}

module.exports = controller;