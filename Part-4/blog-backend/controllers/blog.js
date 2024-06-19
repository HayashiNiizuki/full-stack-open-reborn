const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const deletedBlog = await Blog.findByIdAndDelete(id)
  if (!deletedBlog) {
    return response.status(404).json({
      error: 'blog not found'
    })
  } else {
    response.status(204).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
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
  })

  const savedBlog = await blog.save()
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