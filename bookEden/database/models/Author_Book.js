module.exports = (sequelize, dataTypes) => {
    let alias = 'Author_Book';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        author_id: {
            type: dataTypes.INTEGER
        },
        book_id: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'author_books',
        timestamps: false
    };

    const Author_Book = sequelize.define(alias, cols, config);

    return Author_Book;
};