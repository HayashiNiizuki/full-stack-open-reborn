import axios from "axios"

const url = "http://localhost:3001/"

const getAll = () => {
    return axios.get(`${url}contacts`).then(res => res.data)
}

const create = newContact => {
    return axios.post(`${url}contacts`, newContact).then(res => res.data)
}

const update = (id, newContact) => {
    return axios.patch(`${url}contacts/${id}`, newContact).then(res => res.data)
}

const deleteContact = id => {
    return axios.delete(`${url}contacts/${id}`).then(res => res.data)
}

export default { getAll, create, update, deleteContact }
