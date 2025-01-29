const dummy = (blogs) => {
  // console.log(blogs)
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
    console.log(authorCount)
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

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, countAuthors
}