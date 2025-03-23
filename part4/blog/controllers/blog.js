const blogRouter = require('express').Router()
const Blog = require('../models/blog')  
const User = require('../models/user') 
const { tokenExtractor, tokenValidator } = require('../utils/auth')  // Importamos los middlewares de autenticación

// Obtener todos los blogs
blogRouter.get('/', async (req, res) => {
    try {
        const blogs = await Blog
            .find({})
            .populate('author', { username: 1, name: 1 }) 

        res.status(200).json(blogs)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Obtener un blog específico por ID
blogRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if (blog) {
        res.status(200).json(blog)
    } else {
        res.status(404).end()
    }
})

// Crear un nuevo blog (requiere autenticación)
blogRouter.post('/', tokenExtractor, tokenValidator, async (req, res) => {
    const { title, author, url, likes } = req.body

    if (!title || !author || !url) {
        return res.status(400).json({ error: 'Title, author, and URL are required' })
    }

    try {
        // El usuario autenticado es quien crea el blog
        const blog = new Blog({
            title,
            author,
            url,
            likes: likes || 0,
            user: req.user.id  // Asociamos el blog al usuario autenticado
        })

        const savedBlog = await blog.save()

        // Agregar el blog al array de blogs del usuario
        const user = await User.findById(req.user.id)
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        res.status(201).json(savedBlog)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Actualizar un blog (requiere autenticación)
blogRouter.put('/:id', tokenExtractor, tokenValidator, async (req, res) => {
    const { title, author, url, likes } = req.body

    if (!title || !author || !url) {
        return res.status(400).json({ error: 'Title, author, and URL are required' })
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                title,
                author,
                url,
                likes: likes || 0,
            },
            {
                new: true,
                runValidators: true,
            }
        )

        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' })
        }

        res.status(200).json(updatedBlog)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Eliminar un blog (requiere autenticación)
blogRouter.delete('/:id', tokenExtractor, tokenValidator, async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
        return res.status(404).json({ error: 'Blog not found' })
    }

    if (blog.user.toString() !== req.user.id) {
        // Solo el usuario que creó el blog puede eliminarlo
        return res.status(403).json({ error: 'Forbidden: You can only delete your own blogs' })
    }

    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = blogRouter