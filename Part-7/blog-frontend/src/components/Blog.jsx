import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog, updateBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = ({ blogs }) => {
  if (blogs === null) return
  const id = useParams().id
  const dispatch = useDispatch()
  const _blog = blogs.find((blog) => blog.id == id)
  if (_blog == null) return
  const [blog, setBlog] = useState(_blog)
  const [comment, setComment] = useState('')
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
        <link rel={blog.url} />
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
