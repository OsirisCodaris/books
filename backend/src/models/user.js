'use strict'
const bcrypt = require('bcrypt')

async function hashPassword (user, options) {
  const SALT_FACTOR = 10

  if (!user.changed('password')) {
    return
  }
  const hashage = await bcrypt.hash(user.password, SALT_FACTOR)
  user.password = hashage
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    isadmin: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
    }
  })
  User.prototype.comparePassword = function (candidate) {
    return bcrypt.compare(candidate, this.password)
  }

  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.Book, {
      through: 'view_book',
      as: 'users',
      foreignKey: 'user_id'
    })
  }
  return User
}
