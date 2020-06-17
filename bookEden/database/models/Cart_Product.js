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
        }
    };
    let config = {
        tableName: 'cart_products',
        timestamps: false
    };

    const CartProducts = sequelize.define(alias, cols, config);

    return CartProducts;
};