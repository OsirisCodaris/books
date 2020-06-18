'use strict'
const config = require('../config/config')
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: config.book.defaultCover
    },
    file: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {})
  Book.associate = function (models) {
    // associations can be defined here
    Book.belongsToMany(models.User, {
      through: 'viewBook',
      as: 'bookRead',
      foreignKey: 'book_id'
    })
    Book.belongsToMany(models.User, {
      through: 'sellBook',
      as: 'bookSell',
      foreignKey: 'book_id'
    })
  }
  return Book
}
