const { Book } = require('../models')
const config = require('../config/config')
const fs = require('fs')
const path = require('path')

module.exports = {
  async created (req, res) {
    try {
      const book = await Book.create(req.body)
      return res.send(book.toJSON())
    } catch (error) {
      fs.unlink(path.join(config.book.path, req.body.file), (err) => {
        if (err) {}
      })
      if (req.body.cover) {
        fs.unlink(path.join(config.book.path, req.body.cover), (err) => {
          if (err) {}
        })
      }
      return res.status(403).send({
        message: 'impossible d\'ajouter le document, un document a même le titre'
      })
    }
  }
}
