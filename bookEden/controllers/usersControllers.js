const fs = require ('fs');
const path = require ('path');
const multer = require ('multer');
const bcrypt = require ('bcrypt');
const db=require('../database/models')
let {check, validationResult, body} = require('express-validator');


var usersController = {
  register: function (req, res, next){
      res.render("register", {
        userLogged: req.session.userLogged,
        admin:req.session.admin
      });
  },
    
  create: function (req, res, next) {
    //Agarro los errores
    let errors = validationResult(req);

    console.log(errors);
    var avatar;

    if (req.files[0] == undefined) {
      avatar="avatar-1592599185603.jpg";
      } else {
      avatar=req.files[0].filename;
      }

    if (errors.isEmpty()) {
      db.User.create({
          name:req.body.first_name,
          last_name: req.body.last_name,
          email:req.body.email,
          password:bcrypt.hashSync(req.body.password, 10),//cambie para que entre en la BD
          avatar:avatar,
        }).then(function(newUser){
            // Prendemos la sesión igualando el req.session con el nuevo usuario creado.
            req.session.userLogged = newUser;  
            res.render('Profile',{
              title: 'Perfil',
              userLogged: req.session.userLogged,
              admin:req.session.admin
          })

          });

    } else {

      res.render('register', {
        title: 'Register',
        userLogged: req.session.userLogged,
        avatar: req.session.userLogged.avatar,
        admin: req.session.admin,
        errors: errors.errors
      });
    }
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
     // console.log('Aquí está el error!!!!')

      //Verificamos si hay errores
      if(errors.isEmpty()){
          //si no hay errores
        let userToLogin
        
        console.log(req.body.email)
        
        db.User.findAll()
        .then(function(resultados){
         // console.log(resultados[0].name)
          for (let i = 0; i < resultados.length; i++) {
              if(resultados[i].email==req.body.email){
                if(bcrypt.compareSync(req.body.password, resultados[i].password)){
                  userToLogin=resultados[i];
                }
              }
            
          }
          console.log(userToLogin);
          if(userToLogin == undefined){
            // En caso de que el usuario esté indefinido hacemos nuestro propio mensaje de error
            res.render('log-in', {
                title:'Login',
                userLogged: undefined,
                admin:req.session.admin,
                errors: [
                {msg: 'credenciales inválidas'}
            ]});
        }

          //aplicamos session acá con el usuario encontrado
          req.session.userLogged = userToLogin;

          if(req.body.rememberMe != undefined){
            res.cookie('rememberMe', userToLogin.email, {maxAge: 2628000000000})
          }

          console.log(userToLogin)
          if (userToLogin.isAdmin == 1){
            res.render('admin',{
              title: 'Admin',
              userLogged: req.session.userLogged,
              avatar: req.session.userLogged.imagen,
              admin:req.session.admin
            })
          } else {
            res.render('profile',{
              title: 'Perfil',
              userLogged: req.session.userLogged,
              avatar: req.session.userLogged.avatar,//cambien de imagen a avatar
              admin:req.session.admin
            })
          }
        })//fin del thennnnnnnnnnnnnnn
          
          /* --- Si no se encuentra el usuario --- */
          } else {
          res.render('log-in', {
              errors: errors.errors,
              userLogged: undefined,
              title: 'Login',
              admin:req.session.admin
          })
      }
    },
  
    destroy : function (req, res) {
    db.User.destroy({
        where:{
            id: req.params.id
        }
    })
    req.session.userLogged = undefined
    res.redirect('/');
    },

  profile: function(req, res, next){
    
    res.render('profile',{
      title: 'Perfil',
      userLogged: req.session.userLogged,
      avatar: req.session.userLogged.avatar,
      admin:req.session.admin
    })
  },

  logout: function(req, res){
    console.log('estoy cerrando sesion, aveeeer')
    req.session.userLogged = undefined
    db.Books.findAll({
      where:{
          category_id:1
      }
    })
    .then((novedades)=>{
        db.Books.findAll({
            where:{
                category_id:2
            }
        })
      .then((bestselling)=>{
          db.Books.findAll({
              where:{
                  category_id:4
              }
          })
          .then((popularSpanish)=>{
            db.Authors.findAll()
            .then(function(autores){
              
              res.render('index',{
                title: 'BookEden',
                novedades: novedades,
                popularSpanish: popularSpanish,
                bestselling: bestselling,
                //destacado: destacado,
                autores:autores,
                userLogged: undefined,
                admin:req.session.admin//Probando
              })
              
            })   
          })
        })
    })
  },

  edit : function (req, res) {
    res.render("user-edit",{
      userLogged: req.session.userLogged,
      admin:req.session.admin
    })
  },
  update : function (req, res) {
    var avatar
    if (req.files[0] == undefined) {
      avatar=req.session.userLogged.avatar;
    } else {
      avatar=req.files[0].filename;
    }
    var contrasenia
    console.log( req.body.password+"bodyyyy contrasnaaaaaaaa");
    if(req.body.password==""){
      contrasenia=req.session.userLogged.password
    }
    else{
      contrasenia=req.body.password
    }
    db.User.update({
        name:req.body.name,
        last_name:req.body.last_name,
        password:contrasenia,
        avatar:avatar,
    },{
        where:{
            id:req.params.id
        }
    });
    var nuevoValor
    db.User.findByPk(req.params.id)
    .then(function(resultado){
      console.log(resultado)
      nuevoValor=resultado;
      console.log(nuevoValor+"nuevo valorrrrrrr")
      req.session.userLogged=nuevoValor
      console.log(req.session.userLogged.name)
      res.render('profile',{userLogged:req.session.userLogged,admin:undefined})
    })
   
},

  admin: function(req, res){
    res.render('admin', {
      title: 'Administrador',
      userLogged: req.session.userLogged,
      admin:req.session.admin
    })
  }
  

}

module.exports = usersController;