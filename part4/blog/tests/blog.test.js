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
  const response = await api.get('/api/blog')
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
    .get('/api/blog')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// test('a valid blog can be added', async () => {
//   const newBlog = {
//     title: "New Blog",
//     author: "Test Author",
//     url: "https://supertset.dev",
//     likes: 3,
//   }

//   await api
//     .post('/api/blog')
//     .send(newBlog)
//     .expect(201)
//     .expect('Content-Type', /application\/json/)

//   const blogsAtEnd = await helper.blogsInDb()

//   // Usa expect en lugar de assert
//   expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

//   const titles = blogsAtEnd.map(blog => blog.title)
//   expect(titles).toContain(newBlog.title) // Verifica si el título está en la lista
// })

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "New Blog",
    author: "Test Author",
    url: "https://supertest.dev",
    likes: 3,
  }

  // Realiza una solicitud POST
  const response = await api
    .post('/api/blog') // Asegúrate de que la ruta sea correcta
    .send(newBlog)
    .expect(201) // Código de respuesta esperado
    .expect('Content-Type', /application\/json/)

  // Verifica que el blog fue agregado
  const blogsAtEnd = await helper.blogsInDb() // Obtiene los blogs actuales desde la base de datos
  assert.strictEqual(
    blogsAtEnd.length,
    helper.initialBlogs.length + 1,
    'El número total de blogs no se incrementó en 1'
  )

  // Verifica que el nuevo blog esté en los resultados
  const titles = blogsAtEnd.map((blog) => blog.title)
  assert(
    titles.includes(newBlog.title),
    `El título "${newBlog.title}" no fue encontrado en los blogs`
  )
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