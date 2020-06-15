'use strict'
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cover: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
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
      through: 'view_book',
      as: 'bookRead',
      foreignKey: 'book_id'
    })
    Book.belongsToMany(models.User, {
      through: 'sell_book',
      as: 'bookSell',
      foreignKey: 'book_id'
    })
  }
  return Book
}
