const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.status(200).json(blogs)
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
    const {
        title,
        author,
        url,
        likes
    } = req.body

    const blog = new Blog({
        title,
        author,
        url,
        likes
    })
    const saveBlog = await blog.save()
    res.status(201).json(saveBlog)
})

blogRouter.put('/:id', async (req, res) => {
    const { title, author, url, likes } = req.body
    const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { title, author, url, likes },
        { new: true, runValidators: true } 
    )
    if (!updatedBlog) {
        return res.status(404).json({ error: "Blog NOT found" })
    }
    res.status(200).json(updatedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = blogRouter