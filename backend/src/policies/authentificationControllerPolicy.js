const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      fullname: Joi.string().required(),
      phone1: Joi.string().regex(
        new RegExp('^[+]*[0-9]{8,}$')
      ),
      phone2: Joi.string().allow('').regex(
        new RegExp('^[+]*[0-9]{8,}$')
      ),
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }
    const { error } = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
      case 'fullname':
        res.status(400).send({
          message: 'Le nom d\'utilisateur ne peut être vide'
        })
        break
      case 'email':
        res.status(400).send({
          message: 'Vous avez entrez une adresse mail non valide'
        })
        break
      case 'password':
        res.status(400).send({
          message: 'Le mot de passe doit contenir entre 8 et 32 caratère '
        })
        break
      case 'phone1':
        res.status(400).send({
          message: 'Le numéro de téléphone 1 est incorrect'
        })
        break
      case 'phone2':
        res.status(400).send({
          message: 'Le numéro de téléphone 2 est incorrect'
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
