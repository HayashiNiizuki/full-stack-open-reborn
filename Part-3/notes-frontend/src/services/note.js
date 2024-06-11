import axios from "axios"

const url = "/"

const getAll = () => {
  return axios.get(`${url}api/notes`).then(res => res.data)
}

const create = newNote => {
  return axios.post(`${url}api/notes`, newNote).then(res => res.data)
}

const update = (id, newNote) => {
  return axios.patch(`${url}api/notes/${id}`, newNote).then(res => res.data)
}

const deleteNote = id => {
  return axios.delete(`${url}api/notes/${id}`).then(res => res.data)
}

export default { getAll, create, update, deleteContact: deleteNote }
