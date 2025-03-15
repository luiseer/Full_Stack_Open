const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
    try {
        // Obtener todos los usuarios con sus blogs poblados
        const users = await User
            .find({})
            .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 });  // Poblar los blogs asociados

        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    if (!username || !name || !password) {
        return res.status(400).json({ error: 'The username must be at least 3 characters long' })
    }

    if (password.length < 3) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 3 caracteres' })
    }
    const saltRounds = 10 //magic number
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = userRouter