import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const NewBlog = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = await addNewBlog({ title, author, url })
    if (newBlog) {
      event.target.reset()
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div>
      <h2>add new blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="TextField">
          <TextField
            id="title-input"
            label="title"
            value={title}
            placeholder="type title here"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="TextField">
          <TextField
            id="author-input"
            label="author"
            value={author}
            placeholder="type author here"
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div className="TextField">
          <TextField
            id="url-input"
            label="url"
            value={url}
            placeholder="type your url here"
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <Button size="small" variant="contained" color="primary" id="create-button" type="submit">
          create
        </Button>
      </form>
    </div>
  )
}

export default NewBlog
