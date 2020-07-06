module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart_Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_id: {
            type: dataTypes.INTEGER
        },
        book_id: {
            type:dataTypes.INTEGER
        },
        quantity:{
            type:dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'cart_products',
        timestamps: false,
        underscore: true 
    };

    const CartProducts = sequelize.define(alias, cols, config);
    // CartProducts.associate = function(modelos){

        // CartProducts.hasMany(modelos.Books, {
        //     as:"books"
        // })

        // CartProducts.hasMany(modelos.Cart,{
        //     as:"cart"
        // })
    // CartProducts.associate=function(modelos){
    //     Cart_products.belongsTooks, { througMany(modelos.Boh: cart_products });
    //     Books.belongsToMany(modelos.Cart, { through: cart_products });
    // }
    //}
    return CartProducts;
};