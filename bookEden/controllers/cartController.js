const db = require("../database/models");

var cartController = {
    carrito: function(req, res, next) {
        res.render('cart',{
            userLogged: req.session.userLogged,
            admin:req.session.admin
        });
    },
    create: (req, res, next) => {
        //Verifico que el usuario este logueado
        let user = req.session.userLogged;
        if (user == undefined) {
            res.redirect('/users/login');
        }
        console.log(req.body.book)
       db.Cart.create({
           user_id:req.body.book,
           status: 0
       })
       res.send("tienes un carrito")

        //req.body.book;
    }
}

module.exports = cartController;