module.exports = (sequelize, dataTypes) => {
    let alias = 'Genres';
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
        tableName: 'genres',
        timestamps: false
    };

    const Genres = sequelize.define(alias, cols, config);
    Genres.associate=function(modelos){
        Genres.hasMany(modelos.Books,{
            as:"booksGenres",
            foreignKey:"genre_id"
        })
    }
    return Genres;
};