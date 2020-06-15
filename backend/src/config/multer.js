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
    fileSize: 200 * 1024 * 1024 // 10 MB (max file size)
  },
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname)
    if (ext !== '.pdf' && ext !== '.png' && ext !== '.jpeg' && ext !== '.jpg') {
      callback(new Error('Seul les extensions jpg, jpeg, png et pdf sont acceptées'))
    } else {
      callback(null, true)
    }
  }
})

module.exports = upload
