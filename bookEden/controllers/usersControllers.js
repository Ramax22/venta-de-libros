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
        
      })
  
      let usuario = {
        id: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        // category: req.body.category,
        imagen: avatar,
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
    } else {

      // //Manejo el error de que no haya un usuario seleccionado
      // if (req.files[0] == undefined) {
      //   //en caso de que no haya sido seleccionada un avatar, agrego al array de errores este error con un mensaje personalizado
      //   errors.errors.push({
      //     value: '',
      //     msg: 'No se ha seleccionado una imagen',
      //     param: 'avatar',
      //     location: 'body'
      //   });
      // }

      res.render('register', {
        title: 'Register',
        userLogged: req.session.userLogged,
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
      console.log('Aquí está el error!!!!')
      // console.log(errors);
      //Verificamos si hay errores
      if(errors.isEmpty()){
          //si no hay errores
        // let usersFile = fs.readFileSync(usersFilePath, {encoding: 'utf-8'});
        //   //definivimos la variable
        // let users;
        //   //revisamos si el archivo está vacío
        // if(usersFile == ""){
        //       users = [];
        // } else {
        //   users = JSON.parse(usersFile);
        // };
        //verificamos e-mail y contraseña
 
        let userToLogin
        
        // for(var i = 0; i<users.length; i++){
        //   if(req.body.email == users[i].email){
        //       if(bcrypt.compareSync(req.body.password, users[i].password)){
        //         userToLogin = users[i];
        //         //console.log(userToLogin);
        //         break;
        //       }
        //     }
        // }
        console.log(req.body.email)
        db.User.findAll()
        .then(function(resultados){
          console.log(resultados[0].name)
          for (let i = 0; i < resultados.length; i++) {
              if(resultados[i].email==req.body.email){
                if(bcrypt.compareSync(req.body.password, resultados[i].password)){
                  userToLogin=resultados[i];
                }
              }
            
          }
          console.log(userToLogin);
          if(userToLogin == undefined){
            res.render('log-in', {
                title:'Login',
                userLogged: undefined,
                admin:req.session.admin,
                errors: [
                {msg: 'credenciales inválidas'}
            ]});
        }
        
        
        // En caso de que el usuario esté indefinido hacemos nuestro propio mensaje de error
        // if(userToLogin == undefined){
        //       res.render('log-in', {
        //           title:'Login',
        //           userLogged: undefined,
        //           admin:req.session.admin,
        //           errors: [
        //           {msg: 'credenciales inválidas'}
        //       ]});
        //   }

          //aplicamos session acá con el usuario encontrado
          //para que se puede "mantener vivo" la ejecución debería terminar en algún lado
          req.session.userLogged = userToLogin;
          // console.log(req.session.userLogged)

          if(req.body.rememberMe != undefined){
            res.cookie('rememberMe', userToLogin.email, {maxAge: 240000})
          }

          if (userToLogin.email == "mayra.rinconess@gmail.com"){
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
          

          } else {
          res.render('log-in', {
              errors: errors.errors,
              userLogged: undefined,
              title: 'Login',
              admin:req.session.admin
          })
      }
  },destroy : function (req, res) {
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
              res.render('index',{
                title: 'BookEden',
                novedades: novedades,
                popularSpanish: popularSpanish,
                bestselling: bestselling,
                //destacado: destacado,
                userLogged: undefined,
                admin:req.session.admin//Probando
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