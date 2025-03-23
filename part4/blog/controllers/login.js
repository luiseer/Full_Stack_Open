const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
require('dotenv').config()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  // Buscar usuario por username
  const user = await User.findOne({ username })

  // Verificar si el usuario existe y la contraseña es correcta
  const passwordCorrect = user && (await bcrypt.compare(password, user.passwordHash))

  if (!passwordCorrect) {
    return res.status(401).json({
      error: 'Invalid username or password',
    })
  }

  // Crear objeto para el token
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // Firmar token JWT con clave secreta
  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60, // 1 hora
  })

  // Respuesta si todo es correcto
  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
  })
})

module.exports = loginRouter
