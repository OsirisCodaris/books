'use stricts'
var authentification = require('./authentification')
var bookRouter = require('./book')

module.exports = (app) => {
  app.use('/v1', authentification)
  app.use('/v1/book', bookRouter)
}
