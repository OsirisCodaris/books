const multer = require('multer')
var path = require('path')
const config = require('./config')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, config.book.path)
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({
  storage: storage,
  limits: {
    files: 2, // allow up to 5 files per request,
    fileSize: 200 * 1024 * 1024 // 20 MB (max file size)
  },
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname)
    if (file.fieldname === 'cover') {
      if (ext !== '.png' && ext !== '.jpeg' && ext !== '.jpg') {
        callback(new Error('Seulement les extensions jpg, jpeg, png sont acceptées comme image de couverture'))
      } else {
        callback(null, true)
      }
    } else if (file.fieldname === 'file') {
      if (ext !== '.pdf') {
        callback(new Error('Seule l\'extension pdf est acceptées comme document'))
      } else {
        callback(null, true)
      }
    } else {
      callback(new Error('fichier non reconnu'))
    }
  }
})

module.exports = upload
