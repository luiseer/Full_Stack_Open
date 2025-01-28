const express = require('express')
const cors = require('cors')
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const config = require('./utils/config')
const logger = require('./utils/logger')
const errorHandler = require('./utils/errorHandler')



mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('Connecteed to Mongo_DB'))
    .catch(error => logger.error('Error connecting to MongoDB'))


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

app.use(errorHandler)

module.exports = app