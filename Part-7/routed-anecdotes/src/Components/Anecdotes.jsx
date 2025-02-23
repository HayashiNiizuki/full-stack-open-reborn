import { Link } from "react-router-dom"

export const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>Author: {anecdote.author}</p>
    <p>
      Info: <a href={anecdote.info}>{anecdote.info}</a>
    </p>
    <p>Votes: {anecdote.votes}</p>
  </div>
)

export const AnecdoteList = ({ anecdotes, isVisiable, notification }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <p>{isVisiable ? notification : ''}</p>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>{<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>}</li>
        ))}
      </ul>
    </div>
  )
}
