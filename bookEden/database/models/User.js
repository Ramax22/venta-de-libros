module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        avatar: {
            type: dataTypes.STRING
        },
        isAdmin: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false,
        underscore: true 
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function(modelos){
        User.hasMany(modelos.Cart,{
            as: 'cart',
            foreignKey: 'user_id'
        });
    }

    
    return User;
};