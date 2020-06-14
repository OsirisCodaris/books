'use strict'
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    desc: DataTypes.STRING,
    cover: DataTypes.STRING,
    file: DataTypes.STRING
  }, {})
  Book.associate = function (models) {
    // associations can be defined here
    Book.belongsToMany(models.User, {
      through: 'view_book',
      as: 'books',
      foreignKey: 'book_id'
    })
  }
  return Book
}
