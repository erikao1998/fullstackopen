import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUsers = async () => {
  const response = await axios.get('/api/users')
  return response.data
}

const getComments = async (id) => {
  const response = await axios.get(`/api/blogs/${id}/comments`)
  return response.data
}

const createComment = async (id, comment) => {
  console.log('axios: ', comment)
  const response = await axios.post(`/api/blogs/${id}/comments`, comment)
  console.log(response.data)
  return response.data
}


const create = async newObject => {
  const config = {
    headers: { Authorization: token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token}
  }
  console.log(id)

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, getUsers, getComments, create, createComment, update, deleteBlog, setToken }
