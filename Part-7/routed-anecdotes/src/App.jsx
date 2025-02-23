import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'

import { Anecdote, AnecdoteList } from './Components/Anecdotes'
import About from './Components/About'
import Menu from './Components/Menu'
import Footer from './Components/Footer'
import CreateNew from './Components/CreateNew'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [isVisiable, setIsVisiable] = useState(false)

  const [notification, setNotification] = useState('')

  const match = useMatch('/anecdotes/:id')

  const anecdote = match ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id)) : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)))
  }

  const showNotification = (content) => {
    setNotification(content)
    setIsVisiable(true)
    setTimeout(() => {
      setNotification('')
      setIsVisiable(false)
    }, 5000)
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route
          path="/anecdotes"
          element={<AnecdoteList anecdotes={anecdotes} isVisiable={isVisiable} notification={notification} />}
        />
        <Route path="/create" element={<CreateNew addNew={addNew} showNotification={showNotification} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
