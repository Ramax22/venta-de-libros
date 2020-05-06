const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

var indexController = {

    main: function(req,res){

        let novedades = products.filter(function(producto){
            return producto.category == "novedades";
        });

        let bestselling = products.filter(function(producto){
            return producto.category == "bestselling";
        });

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
            destacado: destacado
        });
	},
}

module.exports = indexController;