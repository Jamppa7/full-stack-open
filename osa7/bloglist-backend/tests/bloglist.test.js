const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYwZjVkOWQ1ZDIwNjgxMjc0ODczY2Y0MCIsImlhdCI6MTYyNjcyNTIxMywiZXhwIjoxNjI2ODExNjEzfQ.fHq0UmITxAAugKY3TyNH2xF_-4U2UG0tdWxMxBCbvu8'

describe('blogs tests', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('First class tests')
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultblog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedblogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultblog.body).toEqual(processedblogToView)
  })

  test('blog identifier is defined', async () => {
    const blogsAtStart = await helper.blogsInDb()
    expect(blogsAtStart[0].id).toBeDefined()
  })

  test('a valid blog can be added', async () => {
    const users = await User.find({})

    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      userId: users[0]._id
    }

    await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('React patterns')
  })

  test('blog without author and likes can be added', async () => {
    const users = await User.find({})

    const newBlog = {
      title: 'React patterns',
      url: 'https://reactpatterns.com/',
      userId: users[0]._id
    }

    await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('React patterns')
  })

  test('blog without title and url is not added', async () => {
    const users = await User.find({})

    const newBlog = {
      author: 'Michael Chan',
      likes: 7,
      userId: users[0]._id
    }

    await api
      .post('/api/blogs')
      .auth(token, { type: 'bearer' })
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog without token is not added', async () => {
    const users = await User.find({})

    const newBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      userId: users[0]._id
    }

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    expect(result.body.error).toContain('invalid token')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .auth(token, { type: 'bearer' })
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updateBlog = {
      likes: 777
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const likes = blogsAtEnd.map(b => b.likes)
    expect(likes).toContain(777)
  })
})

describe('users tests', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('a valid user can be added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'aku',
      name: 'Aku Ankka',
      password: 'salainen'
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

  test('user with same username is not added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user without username is not added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Aku Ankka',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user with too short username is not added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'xx',
      name: 'Aku Ankka',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user without password is not added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'aku',
      name: 'Aku Ankka'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('password missing')
    console.error(result.body.error)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user with too short password is not added', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'aku',
      name: 'Aku Ankka',
      password: 'xx'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(result.body.error).toContain('password too short')
    console.error(result.body.error)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
