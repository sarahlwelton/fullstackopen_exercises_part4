const { test, after } = require('node:test')
const helper = require('../utils/list_helper')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

test('the list of all blogs is returned correctly', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 6)
})

test('the unique ID property for each blog is named "id"', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    assert.match(blog.id, /^[0-9a-f]{24}$/i)
  })

})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Adventures in React',
    author: 'Mary Poppins',
    url: 'https://test.test.com/',
    likes: 0
  }

  const initialBlogsResult = await helper.initialBlogs()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')

  assert.strictEqual(blogsAtEnd.body.length, initialBlogsResult.length + 1)

  const blogContents = blogsAtEnd.body.map(blog => blog.title)
  assert(blogContents.includes('Adventures in React'))
})

after(async () => {
  await mongoose.connection.close()
})