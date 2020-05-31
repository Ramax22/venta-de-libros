
var authMiddlewares =
 function (req, res, next){
    
    if(req.session.userLogged != undefined){
         next();
    }else{
        res.render('log-in',{
            title: 'Login',
            userLogged: undefined
          });
          
    }
}

module.exports= authMiddlewares;