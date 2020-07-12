const db = require("../database/models");
const Cart = require("../database/models/Cart");

var cartController = {
    carrito: function(req, res, next) {
        let user = req.session.userLogged;
        if (user == undefined) {
            res.redirect('/users/login');
        }

        db.Cart.findOne({
            where: {
                user_id: user.id,
                status: 1,
               
            },
            include:[{association:"books"}]
        })
        .then((carrito) => {
            //Pregunto si hay carrito activo
            if(carrito){
               db.Cart_Product.findAll({
                   where:{
                       cart_id:carrito.id
                   }
               })
               .then(function(compras){
                
                db.Books.findAll()
                .then(function(book){
                    var valor=0;
                    var articles=0
                    for (let i = 0; i < compras.length; i++) {
                        for (let j = 0; j < book.length; j++) {
                            if(compras[i].book_id==book[j].id){
                                articles+= parseFloat(compras[i].quantity)
                                valor+= parseFloat(compras[i].quantity)* parseFloat(book[j].price)
                            }
                        }
                    }
                    db.Cart.update({
                        total:valor
                    },{
                        where:{
                        id:carrito.id,
                        status:1
                        }
                    })
                    .then(function(carritoActual){
                        
                        res.render('carrito',{
                            userLogged: req.session.userLogged,
                            books:carrito.books,
                            total:valor,
                            quantity:articles,
                            compras:compras
                        })
                    })
                })
     
               })

            } //aquí estaba el else"raja"
        })
    },
    create: (req, res, next) => {
        //Verifico que el usuario este logueado
        let user = req.session.userLogged;
        if (user == undefined) {
            res.redirect('/users/login');
        }
       
        db.Cart.findAll({
            where: {
                user_id: user.id
            }
        })
        .then((carrito) => {
          //  console.log()
            var hayCarrito
            for (let i = 0; i < carrito.length; i++) {
                if(carrito[i].status==1){
                    hayCarrito= carrito[i].id
                }      
            }
            //Pregunto si hay carrito activo
            if(hayCarrito==undefined){
                //creo un carrito y agrego producto
                  //ACAAAAAAAAAAAAAAAAAAA
                db.Cart.create({ 
                    user_id: user.id,
                    status: 1,
                    total:0
                    }).then(function(newCart){
                        db.Cart_Product.create({
                            book_id: req.body.book,
                            cart_id: newCart.id,
                            quantity:req.body.quantity
                        }).then(function(newBook){
                            res.redirect('/cart')
                        })
                            
                        
                    })
               

                //ACAAAAAAAAAAAAAAAAAAA
                // db.Cart.create({ 
                //     user_id: user.id,
                //     status: 1,
                //     total:0
                //     }).then(function(newCart){
                //         console.log(req.body.quantity+"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                //         newCart.addBook(req.body.book,{
                //             through:{quantity:req.body.quantity}}
                //             )
                //         console.log(newCart)
                //         res.redirect('/cart')
                //     })
            }
            else{
                console.log("esta entrando al ELSEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
                db.Cart.findOne({
                    where:{
                        user_id: user.id,
                        status:1,
                     
                    }
                })
                .then(function(newBook){
                    //newBook.addBook(req.body.book,req.body.quantity)
                    
                    //db.Cart_Product.findAll()
                    db.Cart_Product.create({
                        cart_id:newBook.id,
                        book_id:req.body.book,
                        quantity:req.body.quantity
                    })
                    .then(function(quehay){
                        res.redirect("/cart")
                    })

                })
            }
        

        })
        
    },
    delete:function(req,res,next){
        let user = req.session.userLogged;
        db.Cart.findOne({
            where:{
                user_id: user.id,
                status: 1
            }
        })
            .then(function(newCart){
                newCart.removeBook(req.body.book)
                .then(function(){
                    res.redirect('/cart')
                })
            })
        
    },
    payment: function(req,res,next){
        let user=req.session.userLogged.id
        db.Cart.findOne({where:{
            user_id:user,
            status:1
        },include:
            [{association:'books'}]
        })
        .then(function(carrito){
            var valor=0;
            var articles=0
            db.Cart_Product.findAll({
            where:{
                cart_id:carrito.id
            }
        })
        .then(function(compras){
         
          db.Books.findAll()
          .then(function(book){
            var valor=0;
            var articles=0
              for (let i = 0; i < compras.length; i++) {
                  for (let j = 0; j < book.length; j++) {
                      if(compras[i].book_id==book[j].id){
                          articles+= parseFloat(compras[i].quantity)
                          valor+= parseFloat(compras[i].quantity)* parseFloat(book[j].price)
                      }
                    }
                }
            }).then(function(carritoActual){
                console.log(compras)
                console.log('AQUÍ ESTÁ TODO')
                console.log(valor)
                console.log(articles)
                res.render('payment',{
                  userLogged:req.session.userLogged,
                  books:carrito.books,
                  total: valor,
                  quantity: articles
              })
            })
                  
        })
           
            
        })

    },
    
    closeCart:function(req,res,next){

    }
}

module.exports = cartController;