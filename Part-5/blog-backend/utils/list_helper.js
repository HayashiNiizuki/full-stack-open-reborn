const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }
  return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, blogs[0])
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }
  const authorCount = lodash.countBy(blogs, 'author')
  const maxAuthor = lodash.maxBy(Object.keys(authorCount), (author) => authorCount[author])

  return {
    "author": maxAuthor,
    "blogs": authorCount[maxAuthor]
  }
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }
  const authorLikes = lodash(blogs)
    .groupBy('author')
    .map((items, author) => ({
      author: author,
      likes: lodash.sumBy(items, 'likes')
    }))
    .value()

  const maxAuthorLikes = lodash.maxBy(authorLikes, 'likes')
  return maxAuthorLikes
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }