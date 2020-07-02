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
        }
      
    };
    let config = {
        tableName: 'authors',
        timestamps: false
    };

    // const Author = sequelize.define(alias, cols, config);
    // Author.associate=function(modelos){
    //     Author.belongsToMany(modelos.Books,{
    //         as:"booksAuthor",
    //         through:"author_book",
    //         foreignKey:"author_id",
    //         otherKey:"book_id",
    //         timestamps:false
    //     })

    
    const Author = sequelize.define(alias, cols, config);
    
    Author.associate = function(modelos){
        Author.hasMany(modelos.Books,{
            as: 'Books',
            foreignKey: "author_id"
        })
    }

    
    return Author;
};