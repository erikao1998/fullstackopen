const mongoose = require('mongoose')
const config = require('../utils/config')

const url = config.MONGODB_URI

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

module.exports = mongoose.model('Blog', blogSchema)
