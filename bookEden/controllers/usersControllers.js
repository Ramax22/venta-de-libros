const fs = require ('fs');
const path = require ('path');
const multer = require ('multer');
const bcrypt = require ('bcrypt');
const db=require('../database/models')
let {check, validationResult, body} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const usersFilePath = path.join(__dirname, '../data/users.json');

var usersController = {
    
    register: function (req, res, next){
        res.render("register", {
          userLogged: req.session.userLogged,
          admin:req.session.admin
        });
    },

    create: function (req, res, next){
      let errors = validationResult(req);
      console.log("errores del registro")
      console.log(errors);
      
      db.User.create({
        name:req.body.username,
        last_name: req.body.last_name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 10),//cambie para que entre en la BD
        avatar:req.files[0].filename,
        carrito_id:1
      })

      let usuario = {
            id: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            // password: bcrypt.hashSync(req.body.password, 10),
           // category: req.body.category,
            imagen: req.files[0].filename,
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

             
        res.render('log-in',{
          title: 'Login',
          userLogged: req.session.userLogged,
          admin:req.session.admin
        });
    },

    login: function(req,res,next){
      res.render('log-in', {
        title: 'Login',
        userLogged: req.session.userLogged,
        admin:req.session.admin
      });
    },

    processLogin: function(req, res, next){
      // Creamos la variable errores
      let errors = validationResult(req);
      console.log('Aquí está el error!!!!')
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
                  userLogged: undefined,
                  errors: [
                  {msg: 'credenciales inválidas'}
              ]});
          }

          //aplicamos session acá con el usuario encontrado
          //para que se puede "mantener vivo" la ejecución debería terminar en algún lado
          req.session.userLogged = userToLogin;
          console.log(req.session.userLogged)

          if(req.body.rememberMe != undefined){
            res.cookie('rememberMe', userToLogin.email, {maxAge: 240000})
          }

          res.render('profile',{
            title: 'Perfil',
            userLogged: req.session.userLogged,
            avatar: req.session.userLogged.imagen
          })

          } else {
          res.render('log-in', {
              errors: errors.errors,
              userLogged: undefined,
              title: 'Login',
              admin:req.session.admin
          })
      }
  },
  
  profile: function(req, res, next){
    console.log(req.session.userLogged)
    res.render('profile',{
      title: 'Perfil',
      userLogged: req.session.userLogged,
      avatar: req.session.userLogged.imagen,
      admin:req.session.admin
    })
  },

  logout: function(req, res){
    console.log('estoy cerrando sesion, aveeeer')
    req.session.userLogged = undefined

    let novedades = products.filter(function(producto){
      return producto.category == "novedades";
  });

  /* TODOS LOS PRODUCTOS --*/
  let bestsellingAll = products.filter(function(producto){
      return producto.category == "bestselling";
  });

  //console.log(bestsellingAll);
  let bestselling = []
  
  /* -- CICLO PARA TRAER SOLO 3 --*/
  for(let i=0; i<3; i++){
       bestselling.push(bestsellingAll[i]);
  }
     
  //console.log(bestselling);

  let popularSpanish = products.filter(function(producto){
      return producto.category == "popular-spanish";
  });

  let destacado = products.filter(function(producto){
      return producto.category == "destacado";
  });
    res.render('index', {
      title: 'BookEden',
      novedades: novedades,
      bestselling: bestselling,
      popularSpanish: popularSpanish,
      destacado: destacado,
      userLogged: undefined
    })
  }

}

module.exports = usersController;
