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
      const id = action.data.id
      const anecdoteToChange = state.find((d) => d.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map((note) => (note.id === id ? changedAnecdote : note))
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'SET_ANECDOTES':
      return action.data.content
    default:
      return state
  }
}

export const VoteTo = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
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

export default anecdoteReducer
