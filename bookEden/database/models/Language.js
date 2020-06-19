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

    Language.associate=function(modelos){
        Language.hasMany(modelos.Books,{
            as:"books",
            foreignKey:"language_id"
        })
    }


    return Language;
};