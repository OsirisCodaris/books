const { Book } = require('../models')
const config = require('../config/config')
const fs = require('fs')
const path = require('path')
// const sequelize = require('sequelize')

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
      const offset = req.query.offset ? parseInt(req.query.offset) : 0
      const books = await Book.findAndCountAll({
        offset: offset,
        limit: 10,
        attributes: {
          exclude: ['file']
        },
        include: {
          association: 'bookRead',
          attributes: ['id']
        }
      })
      return res.send({
        count: books.count,
        books: books.rows
      })
    } catch (error) {
      return res.status(500).send({
        message: 'Une erreur s\'est produite sur le serveur' + error
      })
    }
  },
  async show (req, res) {
    try {
      const book = await Book.findByPk(req.params.id)
      if (book) {
        // on verifie si l'utilisateur a le droit de lire le document
        const user = req.user
        const userHasSubscribe = user.Subscription.expiredDate() // true si l'utilisateur est a un abonnement valide
        const usercanReadit = await user.hasUserBuy(book) // true s'il a payer le livre
        if (!userHasSubscribe && !usercanReadit) {
          // On entre ici s'il ne peut pas consulter le document c-a-d l'abonnement n'est plus valide et il n'a pas payer le document
          return res.status(403).send({
            message: 'Désolée vous ne pouvez pas accéder a cette ressource sans abonnement ou achat effectuer'
          })
        }
        // enregistre la lecture de l'utilisateur
        await book.addBookRead(req.user)
      }
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
