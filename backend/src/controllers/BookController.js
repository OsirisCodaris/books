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
      // suppression des fichier transfererdans le serveur au cas ou la création n'aboutit pas
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
  },
  async showAll (req, res) {
    try {
      const books = await Book.findAll()
      return res.send({
        books: books
      })
    } catch (error) {
      return res.status(500).send({
        message: 'Une erreur s\'est produite sur le serveur'
      })
    }
  },
  async show (req, res) {
    try {
      const book = await Book.findByPk(req.params.id)
      return res.send(book.toJSON())
    } catch (error) {
      return res.status(400).send({
        message: 'Le document n\'existe pas ou a été supprimé'
      })
    }
  },
  async edit (req, res) {
    try {
      const book = await Book.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      if (book[0]) {
        return res.send({
          book: book[0]
        })
      } else {
        return res.status(400).send({
          message: 'Le document n\'existe pas ou a été supprimé'
        })
      }
    } catch (error) {
      return res.status(400).send({
        message: 'Changez le titre du document'
      })
    }
  },
  async deleted (req, res) {
    try {
      const book = await Book.destroy({
        where: {
          id: req.params.id
        }
      })
      if (book) {
        return res.send({
          book: book
        })
      } else {
        return res.status(400).send({
          message: 'Le document n\'existe pas ou a été supprimé'
        })
      }
    } catch (error) {
      return res.status(500).send({
        message: 'Une erreur s\'est produite'
      })
    }
  }
}
