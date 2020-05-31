//Usuarios logueados
    
    var guestMiddlewares =
    function (req, res, next){
        var userLogged = req.session.userLogged;
        if(userLogged == undefined){
            next();
        }else{
            res.render('profile',{
                title: 'Perfil',
                userLogged: req.session.userLogged,
                avatar: req.session.userLogged.imagen
              });
        }
    }
     



module.exports= guestMiddlewares;