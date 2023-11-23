const controller = {
    index: function (req, res) {
        res.render('index');
    },
    login: function (req, res) {
        res.render('./users/login');
    },
    register: function (req, res) {
        res.render('./users/register');
    },
    cart: function (req, res) {
        res.render('./products/cart');
    },
    productDetail: function (req, res) {
        res.render('./products/productDetail');
    }
}

module.exports = controller;