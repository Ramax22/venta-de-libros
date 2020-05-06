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

		res.redirect('/index');
    }
}

module.exports = productsController;