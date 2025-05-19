import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = ({ blogs }) => {
  if (blogs === null) 
    return
  const id = useParams().id
  const dispatch = useDispatch()
  const _blog = blogs.find((blog) => blog.id == id)
  if (_blog == null) 
    return
  const [blog, setBlog] = useState(_blog)
  const addLike = async (_event) => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await dispatch(updateBlog({ id: blog.id, newBlog }))
    if (updatedBlog) {
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
      </div>
    </div>
  )
}

export default Blog
