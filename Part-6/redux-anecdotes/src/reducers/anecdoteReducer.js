import anecdotesService from '../services/anecdotes'
import { setNotification } from './notificationReducer'
export const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const anecdote = action.data
      return state.map((note) => (note.id === anecdote.id ? anecdote : note))
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'SET_ANECDOTES':
      return action.data.content
    default:
      return state
  }
}

export const VoteTo = (anecdote) => {
  return {
    type: 'VOTE',
    data: anecdote
  }
}

export const AddNew = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: content
  }
}

export const SetAnecdotes = (content) => {
  return {
    type: 'SET_ANECDOTES',
    data: {
      content
    }
  }
}

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(SetAnecdotes(anecdotes))
  }
}

export const addNewAnecdotes = (content) => {
  return async (dispatch) => {
    const newAnecdotes = await anecdotesService.AddNewAnecdotes(content)
    dispatch(AddNew(newAnecdotes))
  }
}

export const voteToThunk = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdotesService.voteToService(id)
    dispatch(VoteTo(anecdote))
  }
}

export default anecdoteReducer
