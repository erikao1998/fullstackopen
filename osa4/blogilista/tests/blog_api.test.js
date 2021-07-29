const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  },
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

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

afterAll(() => {
  mongoose.connection.close()
})
