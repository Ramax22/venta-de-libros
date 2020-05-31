const fs = require('fs');

//Aplicamos un middleware de cookies a nivel aplicación para que se pueda mantener la información del usuario

var rememberMeMiddleware = {

    rememberMe: function(req, res, next){
        next();
        
        //chequeamos si hay una cookie pero no hay un usuario logueado
        if(req.cookies.rememberMe != undefined && req.session.userToLog == undefined){
           
            //reciclo el código del login
            let usersFile = fs.readFileSync('users.json', {encoding: 'utf-8'});
            
            let users;
            
            if(usersFile == ""){
                users = [];
                } else {
                    users = JSON.parse(usersFile);
            };
                        
            let userToLogin
    
            //buscamos el usuario con el email que trajimos con la cookie
            for(var i = 0; i<users.length; i++){
                if(req.cookies.rememberMe == users[i].email){
                   userToLogin = users[i];
                    break;
                }
            }
    
            //ponemos en session el usuario que trajimos de la cookie
            req.session.userLogged = userToLogin;
    
            //de acá, tenemos que aplicarlo en app.js
        }

    }
}

module.exports = rememberMeMiddleware;