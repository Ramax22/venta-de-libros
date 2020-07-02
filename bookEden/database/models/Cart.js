module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER
        },
        status: {
            type:dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'cart',
        timestamps: false
    };

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = function(modelos){
        Cart.belongsTo(modelos.User,{
            as: 'User',
            foreingKey: 'user_id'
        })

        Cart.belongsToMany(modelos.Book,{
            as: 'books',
            through: 'cart_product',
            foreignKey: 'cart_id',
            otherKey: 'book_id',
            timestamps: false
        })
    }
    

    return Cart;
};