'use strict'
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    finishedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {})
  Subscription.associate = function (models) {
    // associations can be defined here
  }
  return Subscription
}
