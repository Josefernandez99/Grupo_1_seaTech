const controller = {
    index: function (req, res) {
        res.render('index');
    },
    login: function (req, res) {
        res.render('login');
    },
    register: function (req, res) {
        res.render('register');
    },
    cart: function (req, res) {
        res.render('cart');
    },
    productDetail: function (req, res) {
        res.render('productDetail');
    }
}

module.exports = controller;