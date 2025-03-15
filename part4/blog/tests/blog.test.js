const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const express = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./helper_test')
const listHelper = require('../utils/list_helper')
const { json } = require('node:stream/consumers')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('unique identifier property of blogs is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body

  blogs.forEach((blog) => {
    assert.ok(blog.id !== undefined) // Verifica que la propiedad id existe
    assert.strictEqual(blog._id, undefined) // Verifica que _id no existe
    assert.strictEqual(blog.__v, undefined) // Verifica que __v no existe
  })
})

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

test('blog are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "New Blog",
    author: "Test Author",
    url: "https://supertest.dev",
    likes: 3,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  // Verifica que el blog fue agregado
  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map((blog) => blog.title)
  assert(
    titles.includes(newBlog.title),
    `El título "${newBlog.title}" no fue encontrado en los blogs`
  )
  assert.strictEqual(
    blogsAtEnd.length,
    helper.initialBlogs.length + 1,
    'El número total de blogs no se incrementó en 1'
  )
  // Verifica que el nuevo blog esté en los resultados
})

test('blog without content si not added', async () => {
  
})

describe('Blog controller tests', () => {

  // Prueba para actualizar un blog
  test('a blog can be updated', async () => {
    // Primero obtenemos un blog existente desde la base de datos
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0] // Usamos el primer blog

    // Datos que vamos a actualizar
    const updatedBlogData = {
      title: 'Updated Blog Title',
      author: 'Updated Author',
      url: 'https://updated-url.dev',
      likes: 10,
    }

    // Realizamos la solicitud PUT
    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlogData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Verificamos que el blog fue actualizado correctamente
    assert.strictEqual(response.body.title, updatedBlogData.title)
    assert.strictEqual(response.body.author, updatedBlogData.author)
    assert.strictEqual(response.body.url, updatedBlogData.url)
    assert.strictEqual(response.body.likes, updatedBlogData.likes)

    // Verificamos que la base de datos tiene los cambios
    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    assert.strictEqual(updatedBlog.title, updatedBlogData.title)
  })
})

describe('Blog controller tests', () => {

  // Prueba para eliminar un blog
  test('a blog can be deleted', async () => {
    // Primero obtenemos los blogs en la base de datos
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0] // Usamos el primer blog

    // Realizamos la solicitud DELETE
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204) // Esperamos un status 204 sin contenido

    // Verificamos que el blog fue eliminado
    const blogsAtEnd = await helper.blogsInDb()
    const deletedBlog = blogsAtEnd.find(blog => blog.id === blogToDelete.id)
    assert.strictEqual(deletedBlog, undefined) // Aseguramos que el blog ya no exista
  })
})


describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ]

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Another blog',
      author: 'Someone Else',
      url: 'http://example.com',
      likes: 10,
      __v: 0,
    },
    {
      _id: '5a422bc61b54a676234d17fa',
      title: 'Yet another blog',
      author: 'Jane Doe',
      url: 'http://example.net',
      likes: 2,
      __v: 0,
    },
  ]

  test('when list is empty, equals 0', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs, equals the sum of their likes', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 17) // 5 + 10 + 2
  })
})

describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
  ]

  const listWithMultipleBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://example.com',
      likes: 12,
      __v: 0,
    },
    {
      _id: '5a422bc61b54a676234d17fa',
      title: 'Yet another blog',
      author: 'Jane Doe',
      url: 'http://example.net',
      likes: 7,
      __v: 0,
    },
  ]

  const listWithTieBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 10,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://example.com',
      likes: 10,
      __v: 0,
    },
  ]

  test('when list is empty, returns null', () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })

  test('when list has only one blog, it is the favorite', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('when list has multiple blogs, returns the one with most likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })

  test('when list has a tie in likes, returns one of the tied blogs', () => {
    const result = listHelper.favoriteBlog(listWithTieBlogs)
    // Cualquiera de los blogs con 10 likes es válido
    assert.ok(
      result.title === 'Go To Statement Considered Harmful' ||
      result.title === 'Canonical string reduction'
    )
  })
})

after(async () => {
  await mongoose.connection.close()
})