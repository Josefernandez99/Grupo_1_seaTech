function authMiddleware(req, res, next) {

    if (!req.session.userLogued) {
        res.redirect("/user/login");
        return;
    }

    next();

}

module.exports = authMiddleware;