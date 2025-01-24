const dummy = (blogs) => {
  console.log(blogs)
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

module.exports = {
  dummy, totalLikes, favoriteBlog
}