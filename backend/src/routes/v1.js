'use stricts'
var authentification = require('./authentification')

module.exports = (app) => {
  app.use('/v1', authentification)
}
