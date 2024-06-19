const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog can be created by post', async () => {
  const newBlog = {
    "title": "王安忆：我认为这是2000年以后最有趣的小说",
    "author": "九久读书人",
    "url": "https://mp.weixin.qq.com/s?__biz=MjM5NDU3ODYwMQ==&mid=2650815114&idx=1&sn=bc25f37a3bacb82cb10b06ce0112e607",
    "likes": 12
  }
  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length + 1)

  const contents = blogAtEnd.map(n => n.url)
  assert(contents.includes('https://mp.weixin.qq.com/s?__biz=MjM5NDU3ODYwMQ==&mid=2650815114&idx=1&sn=bc25f37a3bacb82cb10b06ce0112e607'))
})

test('blog with out likes will be 0', async () => {
  const newBlog = {
    "title": "王安忆：我认为这是2000年以后最有趣的小说",
    "author": "九久读书人",
    "url": "https://mp.weixin.qq.com/s?__biz=MjM5NDU3ODYwMQ==&mid=2650815114&idx=1&sn=bc25f37a3bacb82cb10b06ce0112e607",
  }
  const addedBlog = await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert(addedBlog.body.likes === 0)
})

test('blog add without title will get 400', async () => {
  const newBlog = {
    "author": "九久读书人",
    "url": "https://mp.weixin.qq.com/s?__biz=MjM5NDU3ODYwMQ==&mid=2650815114&idx=1&sn=bc25f37a3bacb82cb10b06ce0112e607",
  }
  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('blog add without url will get 400', async () => {
  const newBlog = {
    "title": "王安忆：我认为这是2000年以后最有趣的小说",
    "author": "九久读书人",
  }
  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('blog delete test', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

  const contents = blogsAtEnd.map(r => r.url)
  assert(!contents.includes(blogToDelete.url))
})

test('blog update test', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogBefore = blogsAtStart[0]

  const blogAfter = await api
    .put(`/api/blogs/${blogBefore.id}`)
    .send({ likes: blogBefore.likes + 1 })
    .expect(200)

  assert.strictEqual(blogBefore.likes, blogAfter.body.likes - 1)
})

after(async () => {
  await mongoose.connection.close()
})