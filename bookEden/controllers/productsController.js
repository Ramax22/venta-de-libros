const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

var productsController = {

    main: function(req, res){
		res.render('products',{
			title: 'BookEden | Products',
			products: products
		})
    },
        
    create: function(req, res){
        res.render('product-create');
    }
}

module.exports = productsController;