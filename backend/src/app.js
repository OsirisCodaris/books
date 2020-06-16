const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./passport')
require('./routes/v1')(app)

db.sequelize.sync().then(() => {
  console.log('Drop and re-sync db.')
  app.listen(config.port, function () {
    console.log('running at http://localhost:' + config.port)
  })
})
