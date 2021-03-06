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
                userLogged: req.session.userLogged
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
            include:[{association:"genero"}, {association:"publisher"}, {association:"Authors"}, {association:"language"}, {association:"format"}]
        })
        .then((resultado)=>{
            res.render('detail', {
                title: resultado.title,
                selectedProduct : resultado,
                userLogged: req.session.userLogged
            }); 
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
            res.render('product-edit-form', {
                title: 'BookEden' + pedidoLibro.title,
                selectedProduct : pedidoLibro,
                categoria:pedidoCategoria,
                idioma:pedidoIdioma,
                formato:pedidoFormato,
                userLogged: req.session.userLogged,
                editorial:pedidoEditorial,
                genero:pedidoGenero,
                autor:pedidoAuthor
            });
        })
    },

    update : function (req, res) {
        let errors=validationResult(req);
        var imagen
        if(req.files[0]!=undefined){
            imagen=req.files[0].filename
        }else{
            db.Books.findOne({
                where:{
                    id:req.params.id
                }
            }).then(function(libro){
                imagen=libro.avatar
            })
        }
        var fechaEditada
        if (req.body.date=="") {
            db.Books.findOne({
                where:{
                    id:req.params.id
                }
            }).then(function(libro){
                fechaEditada=libro.release_date
            })
        }else{
            fechaEditada=req.body.date
        }
        
        if(errors.isEmpty()){
            db.Books.update({
                title:req.body.name,
                price:req.body.price,
                discount:req.body.discount,
                category_id:req.body.category,
                language_id:req.body.language,
                format_id:req.body.format,
                author_id:req.body.author,
                publisher_id:req.body.publisher,
                genre_id:req.body.genre,
                avatar:imagen,
                release_date:fechaEditada
            },{
                where:{
                    id:req.params.id
                }
            })
            .then(function(){
                res.redirect('/products');
            })
        }else{
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
                res.render('product-edit-form', {
                    title: 'BookEden' + pedidoLibro.title,
                    selectedProduct : pedidoLibro,
                    categoria:pedidoCategoria,
                    idioma:pedidoIdioma,
                    formato:pedidoFormato,
                    userLogged: req.session.userLogged,
                    editorial:pedidoEditorial,
                    genero:pedidoGenero,
                    autor:pedidoAuthor,
                    errores:errors.errors
                });
            })
        }
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
        let errors=validationResult(req);
        console.log( req.files[0].filename)
        console.log(errors)
        if(errors.isEmpty()){
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
        }else{
            // res.render("product-create",{
            //     userLogged: req.session.userLogged,
            //     title: 'Agregar producto',
            //     errores:errors.errors
            // })
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
                                        generos:generos,
                                        formatos:formatos,
                                        idiomas:idiomas,
                                        categorias:categorias,
                                        autores:autores,
                                        editorial:editorial,
                                        errores:errors.errors
                                    })     
                                })
                            })
                        })
                    })
                })
            })
        }
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
            ],
            include:[{association:"Authors"}]
        })
        .then(function(books){
            console.log(books)
            res.render('results', {
                busqueda: userSearch,
                books:books,
                userLogged: req.session.userLogged,
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
function getProduct (id) {
    for (let i = 0; i <= products.length; i++) {
        if (id == products[i].id) {
            var selectedProduct = products[i];
            break;
        }
    }
    return selectedProduct;
}