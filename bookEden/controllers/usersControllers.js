const fs = require ('fs');
const path = require ('path');
const multer = require ('multer');
const bcrypt = require ('bcrypt');
let {check, validationResult, body} = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');

<<<<<<< HEAD


var registerController = {
=======
var usersController = {
    
>>>>>>> cc0ce2249fed90e90b5b67b94a71c846ccfa2ca5
    register: function (req, res, next){
        res.render("register");
    },

    create: function (req, res, next){
      let usuario = {
            id: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
           // category: req.body.category,
            imagen: req.files[0].filename
                   
        }
       
        var archivoUsuario= fs.readFileSync(usersFilePath,{encoding:'utf-8'})
        let usuarios;
        if(archivoUsuario ==""){
           usuarios=[];
         }else{
          usuarios=JSON.parse(archivoUsuario);
        }
        usuarios.push(usuario);
        usuariosJSON = JSON.stringify(usuarios);
        fs.writeFileSync(usersFilePath, usuariosJSON);
        
<<<<<<< HEAD
        res.redirect ("/products");
    },
    
=======
        res.redirect ("/users");
    },

    login: function(req,res,next){
      res.render('log-in', {
        title: 'Login'
      });
    },

    processLogin: function(req, res, next){
      // Creamos la variable errores
      let errors = validationResult(req);
      console.log(errors);
      //Verificamos si hay errores
      if(errors.isEmpty()){
          //si no hay errores
        let usersFile = fs.readFileSync(usersFilePath, {encoding: 'utf-8'});
          //definivimos la variable
        let users;
          //revisamos si el archivo está vacío
        if(usersFile == ""){
              users = [];
        } else {
          users = JSON.parse(usersFile);
        };
        //verificamos e-mail y contraseña
        
        console.log(req.body);
        let userToLogin
        
        for(var i = 0; i<users.length; i++){
          if(req.body.email == users[i].email){
              if(bcrypt.compareSync(req.body.password, users[i].password)){
                userToLogin = users[i];
                //console.log(userToLogin);
                break;
              }
            }
        }

        console.log(userToLogin);
        // En caso de que el usuario esté indefinido hacemos nuestro propio mensaje de error
        if(userToLogin == undefined){
              res.render('log-in', {
                  title:'Login',
                  errors: [
                  {msg: 'credenciales inválidas'}
              ]});
          }

          //aplicamos session acá con el usuario encontrado
          //para que se puede "mantener vivo" la ejecución debería terminar en algún lado
          req.session.userLogged = userToLogin;
          res.render('login-hecho',{
            title: 'login',
            userLogged: req.session.userLogged
          })

          } else {
          res.render('log-in', {
              errors: errors.errors,
              title: 'Login'
          })
      }
  } 
>>>>>>> cc0ce2249fed90e90b5b67b94a71c846ccfa2ca5
}

module.exports = usersController;
