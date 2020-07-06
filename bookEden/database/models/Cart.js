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

   
    Cart.associate=function(models){
        Cart.belongsTo(models.User,{
            as:"User",
            foreignKey:"user_id"
        })
    }

    return Cart;
};