'use strict'
const moment = require('../config/moment')
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
  Subscription.prototype.expiredDate = function () {
    return moment(this.finishedAt).isAfter(moment())
  }
  return Subscription
}
