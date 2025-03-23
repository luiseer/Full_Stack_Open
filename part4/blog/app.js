// app.js
const express = require('express')
const cors = require('cors')
require('express-async-errors')
const connectDB = require('./utils/db')
const errorHandler = require('./utils/errorHandler')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { tokenExtractor, tokenValidator } = require('./utils/auth')  // Importamos los middlewares
const app = express()

// Conectar a MongoDB
connectDB()

// Middlewares
app.use(cors())
app.use(express.json())

// Extraer y validar el token solo en las rutas que requieren autenticación
app.use(tokenExtractor)  // Este middleware extrae el token y lo asigna a req.token

// Rutas
app.use('/api/notes', tokenValidator, blogRouter)  // Aquí usamos el tokenValidator para proteger la ruta de blogs
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

// Middleware de manejo de errores
app.use(errorHandler)

module.exports = app
