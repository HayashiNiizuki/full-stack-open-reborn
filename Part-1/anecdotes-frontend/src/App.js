import { useState } from 'react'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { text: 'If it hurts, do it more often', vote: 0 },
    { text: 'Adding manpower to a late software project makes it later!', vote: 0 },
    { text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', vote: 0 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', vote: 0 },
    { text: 'Premature optimization is the root of all evil.', vote: 0 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', vote: 0 },
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients', vote: 0 }
  ])
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected].text}</p>
      <p>has {anecdotes[selected].vote} vote</p>
      <button onClick={() => {
        const copy = [...anecdotes]
        copy[selected].vote += 1
        setAnecdotes(copy)
      }}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdotes</button>
      <h1>Most voted anecdote.</h1>
      <p>{anecdotes.reduce((max, anecdote) => anecdote.vote > max.vote ? anecdote : max, anecdotes[0]).text}</p>
    </div>
  )
}

export default App