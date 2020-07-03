const db = require("../database/models");

var cartController = {
    carrito: function(req, res, next) {
        res.render('carrito',{
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
       
        /*db.Cart.findAll({
            where: {
                user_id: user.id
            }
        })
        .then((carrito) => {
            res.send(carrito);
        })*/
        
        db.Cart.create({
            user_id: user.id,
            status: 1
            }).then(function(newCart){
                newCart.addBook(req.body.book)
                console.log(newCart)
            })

        //req.body.book;
    }
}

module.exports = cartController;