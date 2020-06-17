const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//Testing - BORRAR
let db = require('../database/models');
//Testing - BORRAR

var indexController = {

    main: function(req,res){

        //Testing - BORRAR
        db.Language.findAll()
        .then(function(autores){
            console.log(autores);
        })
        .catch(function(e) {
            console.log("ERROR en Language");
        });

        db.Publisher.findAll()
        .then(function(autores){
            console.log(autores);
        })
        .catch(function(e) {
            console.log("ERROR en Publisher");
        });

        db.User.findAll()
        .then(function(autores){
            console.log(autores);
        })
        .catch(function(e) {
            console.log("ERROR en User");
        });
        //Testing - BORRAR

        let novedades = products.filter(function(producto){
            return producto.category == "novedades";
        });

        /* TODOS LOS PRODUCTOS --*/
        let bestsellingAll = products.filter(function(producto){
            return producto.category == "bestselling";
        });

        //console.log(bestsellingAll);
        let bestselling = []
        
        /* -- CICLO PARA TRAER SOLO 3 --*/
        for(let i=0; i<3; i++){
             bestselling.push(bestsellingAll[i]);
        }
           
        //console.log(bestselling);

        let popularSpanish = products.filter(function(producto){
            return producto.category == "popular-spanish";
        });

        let destacado = products.filter(function(producto){
            return producto.category == "destacado";
        });
		
		res.render('index',{
            title: 'BookEden',
            novedades: novedades,
            bestselling: bestselling,
            popularSpanish: popularSpanish,
            destacado: destacado,
            userLogged: req.session.userLogged
        });
    },
    
    carrito: function(req, res, next) {
        res.render('carrito',{userLogged: req.session.userLogged
        });
    }
}

module.exports = indexController;