import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog, updateBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = ({ blogs }) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [blog, setBlog] = useState(null)
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (blogs) {
      const found = blogs.find((b) => b.id == id)
      setBlog(found || null)
    }
  }, [blogs, id])

  if (!blogs) {
    return <div>Loading blogs...</div>
  }

  if (!blog) {
    return <div>Blog not found.</div>
  }

  const addLike = async (_event) => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await dispatch(updateBlog({ id: blog.id, newBlog }))
    if (updatedBlog) {
      setBlog(updatedBlog)
    }
  }

  const addComment = async (event) => {
    event.preventDefault()
    const updatedBlog = await dispatch(commentBlog({ id: blog.id, comment: comment }))
    if (updateBlog) {
      setComment('')
      setBlog(updatedBlog)
    }
  }

  return (
    <div className="Blog">
      <h3>{blog.title}</h3>
      <div>
        <a rel={blog.url} />
        likes {blog.likes}
        <button id="like-button" onClick={addLike}>
          like
        </button>
        <p>{`added by ${blog.author}`}</p>
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <input
            type="text"
            name="comment"
            value={comment}
            placeholder="comment here"
            onChange={(event) => setComment(event.target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </div>
    </div>
  )
}

export default Blog
