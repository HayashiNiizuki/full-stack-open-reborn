import { useState } from 'react'

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
        title:
        <input
          id="title-input"
          value={title}
          placeholder="type title here"
          onChange={(event) => setTitle(event.target.value)}
        ></input>
        <br/>
        author:
        <input
          id="author-input"
          value={author}
          placeholder="type author here"
          onChange={(event) => setAuthor(event.target.value)}
        ></input>
        <br/>
        url:
        <input
          id="url-input"
          value={url}
          placeholder="type your url here"
          onChange={(event) => setUrl(event.target.value)}
        ></input>
        <br/>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlog
