const { test, after } = require('node:test')
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

after(async () => {
  await mongoose.connection.close()
})