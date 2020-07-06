const fs = require('fs');
const path = require('path');
const db=require("../database/models")
let {check, validationResult, body} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


var cartControllers= {

   


    
  
/*carga: function(req, res){
        db.book.findAll()
    .then(listadoBook=>{
        if(listadoBook){
            if(req.session.cart == undefined){
                req.session.cart = [];
            }
            res.render("carrito",{
                title: "titulo"
            })
        }
    })
},

agregar: function(req, res){
    var cart = req.session.cart
    var externo = req.params.externo
    db.Book.findOne({
        where: {
            book: externo,
            userLogged: req.session.userLogged,
            status: "activo"
        }
        .then(function (carrito){
            if (book){
                var posicion= cartControllers.verificar(carrito, externo);
                if(posicion == -1){
                    var datos={
                        id: book.id,
                        externo:externo,
                        name: book.title,
                        cantidad:1
                    }
                    carrito.push(datos);
                }
                req.session.carrito= carrito;
                console.log(req.session.carrito);
                
            }
            
        })
    })
},

static verificar (lista, externo){
    var posicion=-1;
    for (let i = 0; i < lista.length; i++) {
        if(lista[i].externo == externo){
            posicion= i;
            break;
        }
        
    }
},
*/
    carrito: function(req, res, next) {
        res.render('carrito',{
            userLogged: req.session.userLogged,
            admin:req.session.admin
        });
    }
}
module.exports = cartControllers;
