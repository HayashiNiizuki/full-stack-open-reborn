import axios from 'axios'

const url = '/'
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  return axios.get(`${url}api/notes`).then((res) => res.data)
}

const create = async (newNote) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(`${url}api/notes`, newNote, config)
  return response.data
}

const update = (id, newNote) => {
  const request = axios.put(`${url}api/notes/${id}`, newNote)
  return request.then((response) => response.data)
}

const deleteNote = (id) => {
  return axios.delete(`${url}api/notes/${id}`).then((res) => res.data)
}

const noteService = { getAll, create, update, deleteNote, setToken }

export default noteService
