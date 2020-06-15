'use strict'
var express = require('express')
var router = express.Router()
var BookController = require('../controllers/BookController')
var BookControllerPolicy = require('../policies/BookControllerPolicy')

router.route('/')
  .post(BookControllerPolicy.uploader, BookControllerPolicy.created, BookController.created)

module.exports = router
