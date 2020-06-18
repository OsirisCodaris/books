'use strict'
var express = require('express')
var router = express.Router()
var BookController = require('../controllers/BookController')
var BookControllerPolicy = require('../policies/BookControllerPolicy')
const Uploader = require('../services/Uploader')
const isAuthenticated = require('../policies/isAthenticated')

router.route('/')
  .post(Uploader.bookUpload, BookControllerPolicy.created, BookController.created)
  .get(isAuthenticated, BookController.showAll)
router.route('/:id')
  .get(isAuthenticated, BookController.show)
  .put(Uploader.bookUpload, BookControllerPolicy.updated, BookController.edit)
  .delete(BookController.deleted)

module.exports = router
