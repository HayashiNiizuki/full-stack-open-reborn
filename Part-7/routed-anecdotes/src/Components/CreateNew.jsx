import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../Hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.showNotification(`a new anecdote ${content.value} created!`)
    navigate('/anecdotes')
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input name="content" type={content.type} value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name="author" type={author.type} value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name="info" type={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <button type='submit'>create</button>
        <button type='reset'>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
