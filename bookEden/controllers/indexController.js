const fs = require('fs');
const path = require('path');
const db= require("../database/models")


var indexController = {

    main: function(req,res){

        db.Books.findAll({
            where:{
                category_id:1
            },
            include:[{association:"Authors"}]
            
        })
        .then((novedades)=>{
            db.Books.findAll({
                where:{
                    category_id:2
                },
                include:[{association:"Authors"}]
            })
            .then((bestselling)=>{
                db.Books.findAll({
                    where:{
                        category_id:4
                    },
                    include:[{association:"Authors"}]
                })
                .then((popularSpanish)=>{
                    db.Books.findAll({
                        where:{
                            category_id:5
                        },
                        include:[{association:"Authors"}]
                    })
                    .then((destacado)=>{
                        db.Authors.findAll()
                        .then(function(autores){ 
                            db.Category.findAll()
                            res.render('index',{
                                title: 'BookEden',
                                novedades: novedades,
                                bestselling: bestselling,
                                popularSpanish: popularSpanish,
                                destacado: destacado,
                                userLogged: req.session.userLogged,
                                autores:autores
                            })
                        })
                    })
                })
            })
        })


    }
} 
  


module.exports = indexController;