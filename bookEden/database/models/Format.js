module.exports = (sequelize, dataTypes) => {
    let alias = 'Format';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'format',
        timestamps: false
    };

    const Format = sequelize.define(alias, cols, config);

    Format.associate=function(modelos){
        Format.hasMany(modelos.Books,{
            as:"booksFormat",
            foreignKey:"format_id"
        })
    }
    return Format;
};