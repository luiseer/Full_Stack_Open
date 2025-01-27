const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: 'Understanding JavaScript',
      author: 'John Smith',
      url: 'http://example.com/javascript',
      likes: 7,
    },
    {
      title: 'Learning React',
      author: 'Jane Doe',
      url: 'http://example.com/react',
      likes: 15,
    },
  ]
// Generar un ID inexistente
const nonExistingId = async () => {
    const blog = new Blog({
      title: 'Temporary Blog',
      author: 'Tester',
      url: 'http://example.com/temp',
      likes: 0,
    })
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
  }
  
// Recuperar todos los blogs de la base de datos en formato JSON
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
  }

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
  }