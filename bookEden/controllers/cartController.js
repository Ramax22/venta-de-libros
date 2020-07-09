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
               // console.log(carrito)
               db.Cart_Product.findAll({
                   where:{
                       cart_id:carrito.id
                   }
               })
               .then(function(compras){
                
                db.Books.findAll()
                .then(function(book){
                    
                    var valor=0;
                    for (let i = 0; i < compras.length; i++) {
                        for (let j = 0; j < book.length; j++) {
                            if(compras[i].book_id==book[j].id){
                                
                                valor+= parseFloat(compras[i].quantity)* parseFloat(book[j].price)
                            }
                        
                        }
                    }
                    db.Cart.update
                })
                //    for (let i = 0; i < compras.length; i++) {
                //        //console.log(compras[i].book_id);
                       
                //        db.Books.findOne({
                //            where:{
                //                id:compras[i].book_id
                //            }
                //        })
                //        .then(function(book){
                //            valor+=book.price
                //             console.log(valor);
                //        })

                //     }
                //     res.send(valor)
                    
               })
                res.render("carrito",{
                    userLogged: req.session.userLogged,
                    //admin:req.session.admin,
                    books:carrito.books
                })

            }else{
              console.log("raja")
            }
        })
        

        // res.render('cart',{
        //     userLogged: req.session.userLogged,
        //     admin:req.session.admin,

        // });
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
                }).then(function(newBook){
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
                    // .then(function(cart){
                    //     db.Cart_Product.update({quantity:req.body.quantity},{where:{id:cart.id} })
                    //     .then(quantity=>{
                    //         res.redirect("/cart")
                    //     })
                    //     console.log(cart[0])
                    //     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                    // })
                   // console.log(newBook)
                    
                 //   res.redirect('/cart')
                })
            }

        })
        


    

        
    },
    delete:function(req,res,next){
        let user = req.session.userLogged;
        // db.Cart.destroy({
        //     where: {
        //         user_id: user.id,
        //         status: 1
                
        //     },
        //     include:[{association:"books", where:{
        //         book_id:req.body.book
        //     }}],
            
        // })
        db.Cart.findOne({
            where:{
                user_id: user.id,
                status: 1
            }
        })
            .then(function(newCart){
                newCart.removeBook(req.body.book)
                console.log(newCart)
                res.redirect('/cart')
            })
        
        // .then((carrito) => {
        //     //Pregunto si hay carrito activo
        //     if(carrito){
        //         console.log(carrito)
        //         res.render("carrito",{
        //             userLogged: req.session.userLogged,
        //             //admin:req.session.admin,
        //             books:carrito.books
        //         })

        //     }else{
        //       console.log("raja")
        //     }
        // })
        // db.Books.destroy({
        //     where:{
        //         id: req.params.id
        //     }
        // })
    }
}

module.exports = cartController;