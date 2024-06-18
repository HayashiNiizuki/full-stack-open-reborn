const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response, next) => {
  Blog.find({}).then(blogs => { response.json(blogs) })
})

blogRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id

  Blog.findByIdAndDelete(id)
    .then(deletedBlog => {
      if (!deletedBlog) {
        return response.status(404).json({
          error: 'blog not found'
        });
      }
      response.status(204).end();
    })
    .catch(error => next(error))
})

blogRouter.post('/', (request, response, next) => {
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
    likes: body.likes
  })

  blog.save()
    .then(savedBlog => {
      response.json(savedBlog);
    })
    .catch(error => next(error));
})

blogRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBLog => {
      response.json(updatedBLog)
    })
    .catch(error => next(error))
})

module.exports = blogRouter