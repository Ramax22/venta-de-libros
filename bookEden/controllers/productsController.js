const fs = require('fs');
const db=require("../database/models")
let {check, validationResult, body} = require('express-validator');

var productsController = {

    main: function(req, res){
        db.Books.findAll()
        .then(function(books){
            return res.render('products', {
                title: 'BookEden | Products',
                books: books,
                userLogged: req.session.userLogged,
                admin:req.session.admin
            })
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
                            db.Publisher.findAll()
                            .then((editorial)=>{
                                res.render('product-create',{
                                    title: 'Agregar producto',
                                    userLogged: req.session.userLogged,
                                    admin:req.session.admin,
                                    generos:generos,
                                    formatos:formatos,
                                    idiomas:idiomas,
                                    categorias:categorias,
                                    autores:autores,
                                    editorial:editorial
                            })     
                            })
                        })
                    })
                })
            })
        })
       
    },

    detail : function (req, res) {
        db.Books.findByPk(req.params.id,{
            include:[{association:"genero"}, {association:"publisher"}]
        })
        .then((resultado)=>{
            db.Authors.findAll()
            .then(function(autor){
                res.render('detail', {
                    title: 'BookEden' + resultado.title,
                    selectedProduct : resultado,
                    userLogged: req.session.userLogged,
                    admin:req.session.admin,
                    autor:autor
                }); 
            })
        })

    },

    edit : function (req, res) {
        let pedidoLibro= db.Books.findByPk(req.params.id,{
            include:[{association:"genero"},{association:"category"},{association:"format"},{association:"language"},{association:"publisher"} ]
        })
        let pedidoCategoria= db.Category.findAll();
        let pedidoIdioma=db.Language.findAll();
        let pedidoFormato=db.Format.findAll();
        let pedidoGenero=db.Genres.findAll();
        let pedidoEditorial=db.Publisher.findAll();
        let pedidoAuthor=db.Authors.findAll()
        Promise.all([pedidoLibro,pedidoCategoria,pedidoIdioma,pedidoFormato,pedidoGenero,pedidoEditorial,pedidoAuthor])
        .then(function([pedidoLibro,pedidoCategoria,pedidoIdioma,pedidoFormato,pedidoGenero,pedidoEditorial,pedidoAuthor]){
          
            console.log(pedidoLibro.category_id)
            res.render('product-edit-form', {
                title: 'BookEden' + pedidoLibro.title,
                selectedProduct : pedidoLibro,
                categoria:pedidoCategoria,
                idioma:pedidoIdioma,
                formato:pedidoFormato,
                userLogged: req.session.userLogged,
                admin:req.session.admin,
                editorial:pedidoEditorial,
                genero:pedidoGenero,
                autor:pedidoAuthor
            });
        })
    },

    update : function (req, res) {
       db.Books.update({
            title:req.body.name,
            price:req.body.price,
            discount:req.body.discount,
            category_id:req.body.category,
            language_id:req.body.language,
            format_id:req.body.format,
            author_id:req.body.author,
            publisher_id:req.body.publisher,
            genre_id:req.body.genre
        },{
            where:{
                id:req.params.id
            }
        });
        
        res.redirect('/products');
    },

    destroy : function (req, res) {
        db.Books.destroy({
            where:{
                id: req.params.id
            }
        })
        
        res.redirect('/products');
    },
    
    created:function(req,res,next){
      //funciona para un array vacio o ya empezado
        
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
            publisher_id:req.body.publisher,
            release_date:req.body.date
            
        })
        .then(function(algo){
            res.redirect('/products');
        })
      
    },

    /* --- SEARCH ---*/
    results: function(req,res){
        let userSearch = req.query.search;
        db.Books.findAll({
            where: {
                title: {[db.Sequelize.Op.substring]: userSearch}
            },

            order: [
                ['title', "DESC"]
            ]
        })
        .then(function(books){
            console.log(books)
            res.render('results', {
                busqueda: userSearch,
                books:books,
                userLogged: req.session.userLogged,
                admin:req.session.admin,
                title: 'Resultados'//hacer resultados
            })
        })

    },

    /* --- AUTHORS ---*/

    authors: function(req, res){
        db.Authors.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        .then(function(authors){
            res.render('authors', {
                authors: authors,
                title: 'Autores',
                userLogged: req.session.userLogged,
                admin:req.session.admin
            })
        })
    },

    authorSafe: function(req,res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
            console.log(req.body.authorName)
            db.Authors.create({
                name: req.body.authorName
            })
            console.log(req.body.authorName)
            res.redirect('/products/authors')

        } else {
            res.render('author-create', {
                title: 'Crear un Autor',
                errors: errors.errors,
                userLogged: req.session.userLogged,
                admin:req.session.admin
            })
        }
    },

    /* --- PUBLISHERS ---*/

    publishers: function(req, res){
        db.Publisher.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        .then(function(publishers){
            res.render('publishers', {
                publishers: publishers,
                title: 'Editoriales',
                userLogged: req.session.userLogged,
                admin:req.session.admin
            })
        })
    },

    publisherSafe: function(req,res){
        let errors = validationResult(req);
        if(errors.isEmpty()){
            
            db.Publisher.create({
                name: req.body.publisher
            })
            
            res.redirect('/products/publishers')

        } else {
            res.render('publisher-create', {
                title: 'Ingresar una editorial',
                errors: errors.errors,
                userLogged: req.session.userLogged,
                admin:req.session.admin
            })
        }
    }


}

module.exports = productsController;

// Funcion que retorna un producto (El filter no me funciona por alguna razón)
/*function getProduct (id) {
    for (let i = 0; i <= products.length; i++) {
        if (id == products[i].id) {
            var selectedProduct = products[i];
            break;
        }
    }
    return selectedProduct;
}*/