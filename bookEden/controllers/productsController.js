const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

var productsController = {

    main: function(req, res){
        res.send("aquí estoy")
    },
        
    create: function(req, res){
        res.render('product-create');
    },

    detail : function (req, res) {
        var selectedProduct = getProduct(req.params.id);
        res.render('detail', {
            'selectedProduct' : selectedProduct
        });
    },

    edit : function (req, res) {
        var selectedProduct = getProduct(req.params.id);
        res.render('product-edit-form', {
            'selectedProduct' : selectedProduct
        });
    },

    update : function (req, res) {
        for (let i = 0; i <= products.length; i++) {
            if (req.params.id == products[i].id) {
                products[i].title = req.body.title;
				products[i].author = req.body.author;
				products[i].price = req.body.price;
				products[i].discount = req.body.discount;
				products[i].category = req.body.category;
                products[i].description = req.body.description;
                products[i].language = req.body.language;
                products[i].format = req.body.format;
                products[i].date = req.body.date;

                break;
            }
        }
		let productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);
        
        res.redirect('/index');
    },

    destroy : function (req, res) {
        for (let i = 0; i < products.length; i++) {
			if (products[i].id == req.params.id) {
				products.splice(i, 1);
				break;
			}
		}
		let productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);
        
        res.redirect('/index');
    }
}

module.exports = productsController;

// Funcion que retorna un producto (El filter no me funciona por alguna razón)
function getProduct (id) {
    for (let i = 0; i <= products.length; i++) {
        if (id == products[i].id) {
            var selectedProduct = products[i];
            break;
        }
    }
    return selectedProduct;
}