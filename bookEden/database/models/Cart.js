module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER,
            unique: false
        },
        status: {
            type:dataTypes.INTEGER
        },
        total: {
            type:dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'cart',
        timestamps: false,
        underscore: true 
    };

    const Cart = sequelize.define(alias, cols, config);

     Cart.associate = function(modelos){
            Cart.belongsTo(modelos.User,{
                as: 'user',
                foreignKey: 'user_id'
            })

        Cart.belongsToMany(modelos.Books, {
            as: 'books',
            through: 'cart_products',
            foreignKey: 'cart_id',
            otherKey: 'book_id',
            timestamps: false
        })
    }
    
    return Cart;
};