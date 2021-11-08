const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  response.json(blog.toJSON())
})
blogsRouter.post('/:id/comments', async (request, response, next) => {
  const comment = request.body
  const url_id = request.params.id
  const blog = await Blog.findById(url_id)
  console.log(comment.comment)
  console.log(comment)
  console.log(blog)
  blog.comments = blog.comments.concat(comment.comment)
  savedBlog = await blog.save()
  console.log(savedBlog)
  response.status(201).json(comment.comment)
})

blogsRouter.get('/:id/comments', async (request, response, next) => {
  const url_id = request.params.id
  const blog = await Blog.findById(url_id)
  console.log(blog)
  if (!blog.comments) {
    response.json(blog.comments.map(comment => comment.toJSON()))
  } else {
    response.json(blog.comments)
  }
})

blogsRouter.post('/', async (request, response, next) => {

  const body = request.body
  try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })

    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id

    })
    const savedBlog = await blog.save()
      .catch(error => next(error))
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    return response.status(201).json(savedBlog.toJSON())
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return response.status(401).json({ error: 'token expired' })
    } else if (error.name === "JsonWebTokenError") {
      return response.status(401).json({ error: 'invalid token'})
    } else {
      return response.status(401).json({ error: `${error.name}`})
    }

  }

})

blogsRouter.delete('/:id', async (request, response, next) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  console.log(request.params.id)
  const blog = await Blog.findById(request.params.id)
  console.log(blog)
  const userid = decodedToken.id
  if ( blog.user.toString() === userid.toString()) {

    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).json(deletedBlog.toJSON())
  } else {
    return response.status(401).json({ error: 'authorization failed'})
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { likes: body.likes }, { new: true })

  response.status(200).json(updatedBlog.toJSON())

})

module.exports = blogsRouter
