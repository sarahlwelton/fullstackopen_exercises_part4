const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)

  return blogs.length === 0
    ? []
    : sortedBlogs[sortedBlogs.length - 1]
}

const countAuthors = (blogs) => {

  const authors = blogs.map((blog) => blog.author)

  const createCount = (authors) => {

    let authorCount = {}

    authors.forEach(author => {

      if (authorCount[author] === undefined ) {
        authorCount[author] = 1
      } else {
        authorCount[author] = authorCount[author] + 1
      }
    })
    return authorCount
  }

  return createCount(authors)
}

const mostBlogs = (blogs) => {

  const countedAuthors = countAuthors(blogs)

  let highestCount = 0

  let maxAuthor = ''

  Object.entries(countedAuthors).forEach(([ author, count ]) => {
    if (count > highestCount) {
      highestCount = count
      maxAuthor = author
    }
  })
  return highestCount === 0
    ? undefined
    :{ 'author': maxAuthor, 'blogs': highestCount }
}

const countLikes = (blogs) => {

  return blogs.reduce((result, blog) => {

    const { author, likes } = blog

    result[author] = (result[author] || 0) + likes

    return result
  }, {})
}

const mostLikes = (blogs) => {

  const countedLikes = countLikes(blogs)

  let highestLikes = 0

  let maxAuthor = ''

  Object.entries(countedLikes).forEach(([ author, likes ]) => {
    if (likes > highestLikes) {
      highestLikes = likes
      maxAuthor = author
    }
  })
  return highestLikes === 0
    ? undefined
    :{ 'author': maxAuthor, 'likes': highestLikes }
}

const initialBlogs = async () => {
  const response = await api.get('/api/blogs')

  return response.body
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, countAuthors, countLikes, mostLikes, initialBlogs
}