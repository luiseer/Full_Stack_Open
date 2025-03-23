// utils/auth.js
const jwt = require('jsonwebtoken')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  } else {
    req.token = null
  }

  next()
}

const tokenValidator = (req, res, next) => {
  if (!req.token) {
    return res.status(401).json({ error: 'Token missing' })
  }

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    req.user = decodedToken  // Asignamos el usuario decodificado al request
    next()  // Llamamos al siguiente middleware o ruta
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}

module.exports = {
  tokenExtractor,
  tokenValidator
}
