const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { tokenExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.delete('/:id', tokenExtractor, async (request, response) => {
  const id = request.params.id
  const token = request.token
  const blogToDelete = await Blog.findById(id)
  if (!blogToDelete) {
    return response.status(404).json({
      error: 'blog not found'
    })
  }
  if (blogToDelete.user.toString() != token.id.toString()) {
    response.status(403).end()
  }
  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.post('/', tokenExtractor, async (request, response) => {
  const body = request.body
  const token = request.token

  const user = await User.findById(token.id)
  if (!body.title) {
    return response.status(400).json({
      error: 'title missing'
    })
  } else if (!body.author) {
    return response.status(400).json({
      error: 'author missing'
    })
  } else if (!body.url) {
    return response.status(400).json({
      error: 'url missing'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBLog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBLog)
})

module.exports = blogRouter