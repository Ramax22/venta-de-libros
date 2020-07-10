const fs = require('fs');
const db = require('../database/models')

//Aplicamos un middleware de cookies a nivel aplicación para que se pueda mantener la información del usuario

var rememberMeMiddleware = {

    rememberMe: function(req, res, next){
        next();
        console.log('estoy en el middleware')
        
        //chequeamos si hay una cookie pero no hay un usuario logueado
        if(req.cookies.rememberMe != undefined && req.session.userLogged == undefined){
        
            
           
            //reciclo el código del login
            let userLogged;
            db.User.findAll()
            .then(function(user){
              console.log(user[0].name)
              //buscamos el usuario con el email que trajimos con la cookie
              for (let i = 0; i < user.length; i++) {
                  if(user[i].email == req.cookies.rememberMe){
                      userLogged = user[i];
                      console.log(userLogged)
                      break;
                    }
                }

                //Ponemos en sesión al usuario que está guardado en la cookie
                req.session.userLogged = userLogged
            })  
    
        }
    }
}

module.exports = rememberMeMiddleware;