const blogRouter = require('express').Router()
const Blog = require('../models/blog')  
const User = require('../models/user') 

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


blogRouter.get('/:id', async (req, res) => {

    const blog = await Blog.findById(req.params.id)

    if (blog) {
        res.status(200).json(blog)
    } else {
        res.status(404).end()
    }
})

blogRouter.post('/', async (req, res) => {
    const { title, author, url, likes } = req.body

    if (!title || !author || !url) {
        return res.status(400).json({ error: 'Title, author, and URL are required' })
    }

    try {
        
        const blog = new Blog({
            title,
            author,
            url,
            likes: likes || 0, // Si no se pasa "likes", se asigna 0
        })

        // Guardar el blog en la base de datos
        const savedBlog = await blog.save()

        // Agregar el blog al campo 'blogs' del usuario
        const user = await User.findById(author)
        user.blogs = user.blogs.concat(savedBlog._id)  // Agregar el ID del nuevo blog al array 'blogs'
        await user.save()

        res.status(201).json(savedBlog)
    } catch (error) {
       
        res.status(400).json({ error: error.message })
    }
})


blogRouter.put('/:id', async (req, res) => {
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
                likes: likes || 0, // Si no se pasa "likes", se asigna 0
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

blogRouter.delete('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
        return res.status(404).json({ error: 'Blog not found' })
    }

    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})


module.exports = blogRouter