const fs = require('fs');
const path = require('path');
const db= require("../database/models")


var indexController = {

    main: function(req,res){

        db.Books.findAll({
            where:{
                category_id:1
            }
        })
        .then((novedades)=>{
            db.Books.findAll({
                where:{
                    category_id:2
                }
            })
            .then((bestselling)=>{
                db.Books.findAll({
                    where:{
                        category_id:4
                    }
                })
                .then((popularSpanish)=>{
                    db.Authors.findAll()
                    .then(function(autores){
                        res.render('index',{
                            title: 'BookEden',
                             novedades: novedades,
                              bestselling: bestselling,
                             popularSpanish: popularSpanish,
                             // destacado: destacado,
                            userLogged: req.session.userLogged,
                            admin:req.session.admin,
                            autores:autores
                            })
                    })
                })
            })
        })

        
		
		// res.render('index',{
        //     title: 'BookEden',
        //     novedades: novedades,
        //     bestselling: bestselling,
        //     popularSpanish: popularSpanish,
        //     destacado: destacado,
        //     userLogged: req.session.userLogged,
        //     admin:req.session.admin//Probando
        // });
    },
    
    carrito: function(req, res, next) {
        res.render('carrito',{
            userLogged: req.session.userLogged,
            admin:req.session.admin
        });
    }
}

module.exports = indexController;