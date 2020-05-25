const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

var productsController = {

    main: function(req, res){
		res.render('products',{
			title: 'BookEden | Products',
            products: products,
            userLogged: req.session.userLogged
		})
    },
        
    create: function(req, res){
        res.render('product-create',{
            title: 'Agregar producto',
            userLogged: req.session.userLogged
        })
    },

    detail : function (req, res) {
        var selectedProduct = getProduct(req.params.id);
        res.render('detail', {
            title: 'BookEden' + selectedProduct.name,
            'selectedProduct' : selectedProduct,
            userLogged: req.session.userLogged
        });
    },

    edit : function (req, res) {
        var selectedProduct = getProduct(req.params.id);
        res.render('product-edit-form', {
            title: 'BookEden' + selectedProduct.name,
            'selectedProduct' : selectedProduct,
            userLogged: req.session.userLogged
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
        
        res.redirect('/products');
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
        
        res.redirect('/products');
    },
    
    created:function(req,res,next){
      //funciona para un array vacio o ya empezado
        var ultimo;
        
        if(products.length>0){
             ultimo=products[products.length-1]
             ultimo= ultimo.id+1
        }else{
             ultimo=1;
        }
     
        
      
		let nuevoProducto={
			id: ultimo,
			author: req.body.author,
			price:req.body.price ,
            discount:req.body.discount ,
            category:req.body.category,
			description:req.body.description ,
            lenguage:req.body.lenguage,
            format: req.body.format,
            date:req.body.date,
            image:req.files[0].filename
        }
        console.log(req.files)
        console.log(nuevoProducto);
		products.push(nuevoProducto)
		let modificacion= JSON.stringify(products)
		fs.writeFileSync(productsFilePath,modificacion)

		res.redirect('/products');
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