

 function authMiddlewares(req, res, next){
    if(req.session.userLogged != undefined){
        next();
    }else{
        res.render("register")
    }
}

module.exports= authMiddlewares;