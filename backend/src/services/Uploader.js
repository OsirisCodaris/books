const uploadBook = require('../config/multer').fields([{ name: 'cover', maxCount: 1 }, { name: 'file', maxCount: 1 }])
const multer = require('multer')
const error = {
  fields: 'LIMIT_UNEXPECTED_FILE',
  fileSize: 'LIMIT_FILE_SIZE'
}

module.exports = {
  bookUpload (req, res, next) {
    uploadBook(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        switch (err.code) {
        case error.fields:
          res.status(400).send({
            message: 'Champs non spécifier'
          })
          break
        case error.fileSize:
          res.status(400).send({
            message: 'La taille du fichier est trop grande (taille autorisée < 20 MB)'
          })
          break
        default:
          res.status(500).send({
            message: 'Une erreur s\'est produite lors du transfert des fichiers'
          })
          break
        }
      } else if (err) {
        return res.status(400).send({
          message: err.message
        })
      }
      // changement des valeur des variables cover et file en nouveaux nom enregistrer
      if (req.files) {
        req.body.cover = req.files.cover ? req.files.cover[0].filename : undefined
        req.body.file = req.files.file ? req.files.file[0].filename : undefined
      }
      next()
    })
  }
}
