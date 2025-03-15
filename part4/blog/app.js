const express = require('express')
const cors = require('cors')
require('express-async-errors') // Cargar antes de las rutas
const connectDB = require('./utils/db')
const errorHandler = require('./utils/errorHandler')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/users')

const app = express()

// Conectar a MongoDB
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Rutas
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

// Middleware de manejo de errores
app.use(errorHandler)

module.exports = app