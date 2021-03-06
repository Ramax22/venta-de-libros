module.exports = (sequelize, dataTypes) => {
    let alias = 'Publisher';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING
        }
    };
    let config = {
        tableName: 'publisher',
        timestamps: false
    };

    const Publisher = sequelize.define(alias, cols, config);

    Publisher.associate=function(modelos){
        Publisher.hasMany(modelos.Books,{
            as:"books",
            foreignKey:"publisher_id"
        })
    }
    return Publisher;
};