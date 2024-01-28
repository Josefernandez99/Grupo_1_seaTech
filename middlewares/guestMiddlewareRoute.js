function guesMiddleware(req, res, next) {

    if (req.session.userLogued) {
        res.redirect("/user/profile");
        return;
    }

    next();

}

module.exports = guesMiddleware;