import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const AddNewAnecdotes = async (content) => {
  const object = asObject(content)
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteToService = async (id) => {
  const anecdotes = await getAll()
  let index = -1
  for (let i = 0; i < anecdotes.length; i++) {
    if (anecdotes[i].id == id) {
      index = i
      break
    }
  }
  const anecdote = await axios.get(baseUrl + '/' + id)
  const response = await axios.patch(baseUrl + '/' + id, { votes: anecdote.data.votes + 1 })
  return response.data
}

export default { getAll, AddNewAnecdotes, voteToService }
