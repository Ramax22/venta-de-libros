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
        }
    };
    let config = {
        tableName: 'books',
        timestamps: false
    };

    const Book = sequelize.define(alias, cols, config);

    return Book;
};