const Joi = require('joi')

module.exports = {
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
          message: 'Le document ne peut être vide'
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
  },
  updated (req, res, next) {
    const schema = {
      title: Joi.string().optional(),
      cover: Joi.string().regex(
        new RegExp('([a-zA-Z0-9s_.-:])+(.png|.jpe?g|.gif)$')
      ).optional(),
      file: Joi.string().optional().regex(
        new RegExp('([a-zA-Z0-9s_.-:])+(.pdf)$')
      ),
      price: Joi.number().optional()
    }
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
          message: 'Le document ne peut être vide'
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
