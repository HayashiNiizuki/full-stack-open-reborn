import axios from "axios"

const url = "/"

const getAll = () => {
  return axios.get(`${url}api/contacts`).then(res => res.data)
}

const create = newContact => {
  return axios.post(`${url}api/contacts`, newContact).then(res => res.data)
}

const update = (id, newContact) => {
  return axios.patch(`${url}api/contacts/${id}`, newContact).then(res => res.data)
}

const deleteContact = id => {
  return axios.delete(`${url}api/contacts/${id}`).then(res => res.data)
}

export default { getAll, create, update, deleteContact }
