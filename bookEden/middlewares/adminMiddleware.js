const adminMiddlewares={
    check: function (req, res, next) {
        // Chequeo que el usuario sea el correcto
        var userLogged = req.session.userLogged;
        if (userLogged.isAdmin == 1) {
            // Continuamos
            next();
        } else {
            res.send("No tienes los privilegios para ingresar");
        }
    }

}
module.exports=adminMiddlewares