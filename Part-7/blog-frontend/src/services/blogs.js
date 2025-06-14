import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createNew = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async ({ id, newBlog }) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

const likeBlog = async ({ id, newBlog }) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog)
  return response.data
}

const commentBlog = async ({ id, comment }) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, createNew, updateBlog, likeBlog, commentBlog, deleteBlog }
