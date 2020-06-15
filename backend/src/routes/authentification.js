'use strict'
var express = require('express')
var router = express.Router()
var AuthentificationController = require('../controllers/AuthentificationController')
var AuthentificationControllerPolicy = require('../policies/AuthentificationControllerPolicy')

router.route('/register')
  .post(AuthentificationControllerPolicy.register, AuthentificationController.register)

router.route('/login')
  .post(AuthentificationController.login)
module.exports = router
