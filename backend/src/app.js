const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./models')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./routes/v1')(app)

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and re-sync db.')
  app.listen(process.env.PORT || 8081)
})
