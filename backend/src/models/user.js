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
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    phone1: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone2: {
      allowNull: true,
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
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
      through: 'viewBook',
      as: 'userSee',
      foreignKey: 'user_id'
    })
    User.belongsToMany(models.Book, {
      through: 'sellBook',
      as: 'userBuy',
      foreignKey: 'user_id'
    })
    User.hasOne(models.Subscription)
  }
  return User
}
