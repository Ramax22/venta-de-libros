const fs = require ('fs');
const path = require ('path');
const multer = require ('multer');
const bcrypt = require ('bcrypt');
const db=require('../database/models')
let {check, validationResult, body} = require('express-validator');
const { EADDRINUSE } = require('constants');

var usersController = {
  register: function (req, res, next){
      res.render("register", {
        userLogged: req.session.userLogged
      });
  },
    
  create: function (req, res, next) {
    //Agarro los errores
    let errors = validationResult(req);
    var avatar;

    if (req.files[0] == undefined) {
      avatar="avatar-1592599185603.jpg";
    } else {
      avatar=req.files[0].filename;
    }

    // --- Validamos que el mail no este repetido ---
    let mailVal = req.body.email; // Agarramos el mail que ingresó el usuario en el register

    db.User.findAll()
    .then((usersMail) => {
      for (let i = 0; i < usersMail.length; i++) {
        let mailDB = usersMail[i].email; // Agarramos un mail de la db

        // Pregunto si es el mismo que en el formulario de registro
        if (mailDB.trim() == mailVal.trim()) {
          let error = {
            value: '',
            msg: 'Un usario ya se registró con ese mail.',
            params: 'email',
            location: 'body'
          };
          errors.errors.push(error);
          break;
        }
      }

      if (errors.isEmpty()) {
        db.User.create({
            name:req.body.first_name,
            last_name: req.body.last_name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password, 10),
            avatar:avatar,
          }).then(function(newUser){
            db.Cart.create({ 
              user_id: newUser.id,
              status: 1,
              total:0
              }).then(function(nada){
                  // Prendemos la sesión igualando el req.session con el nuevo usuario creado.
                  req.session.userLogged = newUser;  
                  res.render('Profile',{
                    title: 'Perfil',
                    userLogged: req.session.userLogged
                  })
              })
            
          });
      } else {
        res.render('register', {
          title: 'Register',
          errors: errors.errors
        });
      }
    });
  },

  login: function(req, res, next){
    res.render('log-in', {
      title: 'Login',
      userLogged: req.session.userLogged
    });
  },

  processLogin: function(req, res, next){
    // Creamos la variable errores
    let errors = validationResult(req);

    //Verificamos si hay errores
    if(errors.isEmpty()){
      //si no hay errores
      let userToLogin
      
      db.User.findAll()
      .then(function(resultados){
        for (let i = 0; i < resultados.length; i++) {
            if(resultados[i].email==req.body.email){
              if(bcrypt.compareSync(req.body.password, resultados[i].password)){
                userToLogin=resultados[i];
                break;
              }
            }
          
        }
        
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

        if (userToLogin.isAdmin == 1){
          res.render('admin',{
            title: 'Admin',
            userLogged: req.session.userLogged,
            avatar: req.session.userLogged.imagen,
          })
        } else {
          res.render('profile',{
            title: 'Perfil',
            userLogged: req.session.userLogged,
            avatar: req.session.userLogged.avatar,//cambien de imagen a avatar
          })
        }
      })
      
      /* --- Si no se encuentra el usuario --- */
      } else {
      res.render('log-in', {
          errors: errors.errors,
          userLogged: undefined,
          title: 'Login'
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
      avatar: req.session.userLogged.avatar
    })
  },

  logout: function(req, res){
    // En caso de que el usuario haya se quiera desloguear y haya tildado "recuérdame", hay que eliminar la cookie sobreescribiendo la que ya teníamos pero agregándole una fecha de expiración
    var expiresDate = new Date(2019, 6, 9)
    res.cookie('rememberMe', {expires: expiresDate})
    req.session.userLogged = undefined
    res.redirect('/')
  },

  edit : function (req, res) {
    res.render("user-edit",{
      userLogged: req.session.userLogged
    })
  },

  update : function (req, res) {
    var avatar
    if (req.files[0] == undefined) {
      avatar=req.session.userLogged.avatar;
    } else {
      avatar=req.files[0].filename;
    }
    console.log(req.files[0])
    console.log(avatar)
    var contrasenia
    if(req.body.password==""){
      contrasenia=req.session.userLogged.password
    }
    else{
      contrasenia=bcrypt.hashSync(req.body.password, 10)
    }
    var nuevoValor;
    db.User.update({
        name:req.body.name,
        last_name:req.body.username,
        password:contrasenia,
        avatar:avatar,
    },{
        where:{
            id:req.params.id
        }
    })
    .then(function(resultadoEditado){
      db.User.findByPk(req.params.id)
      .then(function(resultado){
        req.session.userLogged=resultado;
        res.render('profile',{userLogged:req.session.userLogged})
      })
     
     
    })
   

    // db.User.findByPk(req.params.id)
    // .then(function(resultado){
    //   nuevoValor=resultado;
    //   req.session.userLogged=nuevoValor
    //   res.render('profile',{userLogged:req.session.userLogged})
    // })

  },

  admin: function(req, res){
    res.render('admin', {
      title: 'Administrador',
      userLogged: req.session.userLogged
    })
  }
}

module.exports = usersController;