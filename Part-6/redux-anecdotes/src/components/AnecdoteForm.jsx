import { useDispatch } from 'react-redux'
import { addNewAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addNewHandler = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addNewAnecdotes(content))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewHandler}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
