import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { voteToThunk } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()
  const voteHandler = (event) => {
    event.preventDefault()
    dispatch(voteToThunk(anecdote.id))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 2))
  }
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={voteHandler}>vote</button>
      </div>
    </div>
  )
}

const selectAnecdotes = (state) => state.anecdotes
const selectFilterContent = (state) => state.filter.content

// Create a memoized selector for filtered and sorted anecdotes
const selectFilteredAndSortedAnecdotes = createSelector(
  [selectAnecdotes, selectFilterContent],
  (anecdotes, filterContent) => {
    // Filter and sort anecdotes based on the filter content
    const filtered = anecdotes.filter((a) => a.content.includes(filterContent))
    const sorted = filtered.sort((a, b) => b.votes - a.votes)
    return sorted
  }
)

const AnecdoteList = (props) => {
  const filteredAndSortedAnecdotes = useSelector(selectFilteredAndSortedAnecdotes)
  return (
    <div>
      {filteredAndSortedAnecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  )
}

export default AnecdoteList
