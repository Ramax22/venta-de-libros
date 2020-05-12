const fs = require ('fs');
const path = require ('path');
const multer = require ('multer');
const bcrypt = require ('bcrypt');

const usersFilePath = path.join(__dirname, '../data/users.json');



var registerController = {
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
        
        res.redirect ("/products");
    },
    
}

module.exports = registerController;
