const mongoose = require('mongoose')
const config = require('../utils/config')
const logger = require('../utils/logger')

mongoose.set('strictQuery', false)

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI)
        logger.info('Conectado a MongoDB')
    } catch (error) {
        logger.error('Error al conectar a MongoDB:', error.message)
        process.exit(1)
    }
}

module.exports = connectDB
