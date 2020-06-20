const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentification.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const fullnameExist = await User.findOne({
        where: {
          fullname: req.body.fullname
        }
      })
      if (fullnameExist) {
        return res.status(400).send({
          message: 'Ce nom d\'utilisateur existe déjà'
        })
      }
      const user = await User.create(req.body)
      return res.send({
        user: user.id
      })
    } catch (err) {
      return res.status(400).send({
        message: 'l\'email existe déjà !'
      })
    }
  },
  async login (req, res) {
    try {
      const { fullname, password } = req.body
      const user = await User.findOne({
        where: {
          fullname: fullname
        }
      })
      if (!user) {
        return res.status(400).send({
          message: 'Les informations envoyées sont incorrects'
        })
      }
      const isValidPassword = await user.comparePassword(password)
      if (!isValidPassword) {
        return res.status(400).send({
          message: 'Les informations envoyées sont incorrects'
        })
      }
      const userJson = user.toJSON()
      res.send({
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        message: 'une erreur s\'est produit réessayer plus tard'
      })
    }
  }
}
