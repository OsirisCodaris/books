const passport = require('passport')

module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user) {
    if (err) {
      res.status(403).send({
        message: 'vous n\'avez le droit d\'accéder a cette ressource'
      })
    } else {
      req.user = user
      next()
    }
  })(req, res, next)
}
