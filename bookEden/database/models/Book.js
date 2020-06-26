module.exports = (sequelize, dataTypes) => {
    let alias = 'Books';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        author_id: {
            type: dataTypes.INTEGER
        },
        publisher_id: {
            type: dataTypes.INTEGER
        },
        language_id: {
            type: dataTypes.INTEGER
        },
        format_id: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.FLOAT
        },
        description: {
            type: dataTypes.STRING
        },
        discount: {
            type: dataTypes.FLOAT
        },
        rating: {
            type: dataTypes.FLOAT
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        avatar:{
            type: dataTypes.STRING
        },
        release_date:{
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'books',
        timestamps: false
    };

    const Book = sequelize.define(alias, cols, config);

    Book.associate=function(modelos){
        Book.belongsTo(modelos.Language,{
            as:"language",
            foreignKey:"language_id"
        })
        Book.belongsTo(modelos.Format,{
            as:"format",
            foreignKey:"format_id"
        })
        Book.belongsTo(modelos.Category,{
            as:"category",
            foreignKey:"category_id"
        })
        Book.belongsTo(modelos.Genres,{
            as:"genero",
            foreignKey:"genre_id"
        })
        Book.belongsTo(modelos.Publisher,{
            as:"publisher",
            foreignKey:"publisher_id"
        })

        
            Book.belongsToMany(modelos.Authors,{
                as:"booksAuthor",
                through:"author_book",
                foreignKey:"book_id",
                otherKey:"author_id",
                timestamps:false
            })
        
        
    }

    return Book;
};