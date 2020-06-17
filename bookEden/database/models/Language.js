module.exports = (sequelize, dataTypes) => {
    let alias = 'Language';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        language: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'languages',
        timestamps: false
    };

    const Language = sequelize.define(alias, cols, config);

    return Language;
};