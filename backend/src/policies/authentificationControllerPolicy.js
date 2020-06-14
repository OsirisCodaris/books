const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      ),
      isadmin: Joi.boolean()
    }
    const { error } = Joi.validate(req.body, schema)
    if (error) {
      switch (error.details[0].context.key) {
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
      case 'isadmin':
        res.status(400).send({
          message: 'un boolean est requis'
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
