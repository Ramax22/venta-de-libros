const fs = require('fs');
const path = require('path');
const db=require("../database/models")

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

var productsController = {

    main: function(req, res){
		res.render('products',{
			title: 'BookEden | Products',
            products: products,
            userLogged: req.session.userLogged,
            admin:req.session.admin
		})
    },
        
    create: function(req, res){
        db.Genres.findAll()
        .then((generos)=>{
            db.Format.findAll()
            .then((formatos)=>{
                db.Language.findAll()
                .then((idiomas)=>{
                    db.Category.findAll()
                    .then((categorias)=>{
                        db.Authors.findAll()
                        .then((autores)=>{
                            res.render('product-create',{
                                title: 'Agregar producto',
                                userLogged: req.session.userLogged,
                                admin:req.session.admin,
                                generos:generos,
                                formatos:formatos,
                                idiomas:idiomas,
                                categorias:categorias,
                                autores:autores
                            })
                        })
                    })
                })
            })
        })
       
    },

    detail : function (req, res) {
        // var selectedProduct = getProduct(req.params.id);
        // res.render('detail', {
        //     title: 'BookEden' + selectedProduct.name,
        //     'selectedProduct' : selectedProduct,
        //     userLogged: req.session.userLogged,
        //     admin:req.session.admin

        // });
        db.Books.findByPk(req.params.id)
        .then((resultado)=>{
            res.render('detail', {
                title: 'BookEden' + resultado.title,
                selectedProduct : resultado,
                userLogged: req.session.userLogged,
                admin:req.session.admin
        
            }); 

        })

    },

    edit : function (req, res) {
        // var selectedProduct = getProduct(req.params.id);
        // res.render('product-edit-form', {
        //     title: 'BookEden' + selectedProduct.name,
        //     'selectedProduct' : selectedProduct,
        //     userLogged: req.session.userLogged,
        //     admin:req.session.admin
        // });
        let pedidoLibro= db.Books.findByPk(req.params.id,{
            include:[{association:"booksAuthor"},{association:"genero"},{association:"category"},{association:"format"},{association:"language"} ]
        })
        let pedidoCategoria= db.Category.findAll();
        let pedidoIdioma=db.Language.findAll();
        let pedidoFormato=db.Format.findAll();

        Promise.all([pedidoLibro,pedidoCategoria,pedidoIdioma,pedidoFormato])
        .then(function([pedidoLibro,pedidoCategoria,pedidoIdioma,pedidoFormato]){
          
            console.log(pedidoLibro.category_id)
            res.render('product-edit-form', {
                title: 'BookEden' + pedidoLibro.title,
                selectedProduct : pedidoLibro,
                categoria:pedidoCategoria,
                idioma:pedidoIdioma,
                formato:pedidoFormato,
                userLogged: req.session.userLogged,
                admin:req.session.admin
            });
        })
    },

    update : function (req, res) {

        // for (let i = 0; i <= products.length; i++) {
        //     if (req.params.id == products[i].id) {
        //         products[i].title = req.body.title;
		// 		products[i].author = req.body.author;
		// 		products[i].price = req.body.price;
		// 		products[i].discount = req.body.discount;
		// 		products[i].category = req.body.category;
        //         products[i].description = req.body.description;
        //         products[i].language = req.body.language;
        //         products[i].format = req.body.format;
        //         products[i].date = req.body.date;

        //         break;
        //     }
        // }
		// let productsJSON = JSON.stringify(products);
        // fs.writeFileSync(productsFilePath, productsJSON);
        db.Books.update({
            title:req.body.name,
            price:req.body.price,
            discount:req.body.discount,
            category_id:req.body.category,
            language_id:req.body.language,
            format_id:req.body.format
        },{
            where:{
                id:req.params.id
            }
        });
        
        res.redirect('/products');
    },

    destroy : function (req, res) {
        // for (let i = 0; i < products.length; i++) {
		// 	if (products[i].id == req.params.id) {
		// 		products.splice(i, 1);
		// 		break;
		// 	}
		// }
		// let productsJSON = JSON.stringify(products);
        // fs.writeFileSync(productsFilePath, productsJSON);
        db.Books.destroy({
            where:{
                id: req.params.id
            }
        })
        
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
        
        db.Books.create({
            title:req.body.title,
            author_id: req.body.author,
            language_id:req.body.lenguage,
            format_id:req.body.format,
            price:req.body.price ,
            description:req.body.description ,
            discount:req.body.discount,
            rating:3,
            category_id:req.body.category,
            genre_id:req.body.genre,
            avatar:req.files[0].filename,
            publisher_id:req.body.author
            
        })
      
		let nuevoProducto={
            id: ultimo,
            title:req.body.title,
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
        //console.log(req.files)
        //console.log(nuevoProducto);
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