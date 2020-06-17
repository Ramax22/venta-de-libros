module.exports = (sequelize, dataTypes) => {
    let alias = 'Authors';
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
            type:dataTypes.STRING
        }
    };
    let config = {
        tableName: 'authors',
        timestamps: false
    };

    const Author = sequelize.define(alias, cols, config);

    return Author;
};