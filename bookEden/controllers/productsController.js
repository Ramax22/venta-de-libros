var productsController = {

    main: function(req, res){
        res.send("aquí estoy")
    },
        
    create: function(req, res){
        res.render('product-create');
    }
}

module.exports = productsController;