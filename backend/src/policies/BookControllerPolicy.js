const Joi = require('joi')
const upload = require('../config/multer').fields([{ name: 'cover', maxCount: 1 }, { name: 'file', maxCount: 1 }])
const multer = require('multer')

module.exports = {
  uploader (req, res, next) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).send({
          message: 'La taille fichier trop grande et doit être inférieur à 20 MB'
        })
      } else if (err) {
        return res.status(400).send({
          message: err.message
        })
      }
      next()
    })
  },
  created (req, res, next) {
    const schema = {
      title: Joi.string().required(),
      cover: Joi.string().regex(
        new RegExp('([a-zA-Z0-9s_.-:])+(.png|.jpe?g|.gif)$')
      ).optional(),
      file: Joi.string().required().regex(
        new RegExp('([a-zA-Z0-9s_.-:])+(.pdf)$')
      ),
      price: Joi.number().optional()
    }
    req.body.cover = req.files.cover ? req.files.cover[0].filename : undefined
    req.body.file = req.files.file ? req.files.file[0].filename : undefined
    const { error } = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
      case 'title':
        res.status(400).send({
          message: 'Le titre est obligatoire et ne pas être vide'
        })
        break
      case 'file':
        res.status(400).send({
          message: 'L\'extension du fichier n\'est pas reconnue comme étant un document'
        })
        break
      case 'cover':
        res.status(400).send({
          message: 'L\'extension du cover n\'est pas reconnue comme étant une image'
        })
        break
      case 'price':
        res.status(400).send({
          message: 'Le prix n\'a pas été spécifier'
        })
        break
      default:
        res.status(400).send({
          message: 'Les informations que vous avez entrées sont incorrects'
        })
      }
    } else {
      next()
    }
  }
}
