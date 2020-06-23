const path = require('path');
const fs=require('fs');


const productsFilePath = path.join(__dirname, '../data/admin.json');
const admins = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

var adminController = {
    login:function(req,res){
        res.render('admin')
    },
    process:function(req,res){
        let admin =""
        admin = admins.find(function(elemento){
            return elemento.id == req.body.user && elemento.password == req.body.password
        })
        console.log(admin)
        if(admin!=undefined){
            let name= admin.id
            console.log("se creara una session")
            req.session.admin= name;
            admin= req.session.admin;
            console.log("asdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            // res.render('index',{
            //     admin:admin,
            //     title:"BookEden",
            //     userLogged:req.session.userLogged
            // });            
            res.redirect('/index')

        }else{
            console.log('No es un Admin')
            res.redirect('/index');
        }
        

    }
}
module.exports=adminController;