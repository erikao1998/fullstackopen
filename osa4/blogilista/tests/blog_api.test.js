const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

// beforeEach(async () => {
//   await Blog.deleteMany({})
//   let blogObject = new Blog(helper.initialBlogs[0])
//   await blogObject.save()
//   blogObject = new Blog(helper.initialBlogs[1])
//   await blogObject.save()
// })
//
// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })
// test('all blogs are returned', async () => {
//   const response = await api.get('/api/blogs')
//
//   expect(response.body).toHaveLength(helper.initialBlogs.length)
// })

// test('a valid note can be added ', async () => {
//   const newBlog = {
//     title: 'Test',
//     author: 'Test Author',
//     url: 'test_url'
//   }
//
//   await api
//     .post('/api/blogs')
//     .send(newBlog)
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
//
//   const response = await api.get('/api/blogs')
//
//   const titles = response.body.map(r => r.title)
//
//   expect(response.body).toHaveLength(initialBlogs.length + 1)
//   expect(titles).toContain('Test')
//
// })

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('creation fails with proper statuscode and message if username already taken', async () => {
   const usersAtStart = await helper.usersInDb()

   const newUser = {
     username: 'root',
     name: 'Superuser',
     password: 'salainen',
   }

   const result = await api
     .post('/api/users')
     .send(newUser)
     .expect(400)
     .expect('Content-Type', /application\/json/)

   expect(result.body.error).toContain('`username` to be unique')

   const usersAtEnd = await helper.usersInDb()
   expect(usersAtEnd).toHaveLength(usersAtStart.length)
 })
})

afterAll(() => {
  mongoose.connection.close()
})
