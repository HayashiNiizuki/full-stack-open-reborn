import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ _blog, canDelete }) => {
  const dispatch = useDispatch()
  const [blog, setBlog] = useState(_blog)
  const [showDetail, setShowDetail] = useState(false)
  const hideWhenVisible = { display: showDetail ? '' : 'none' }
  const [deleted, setDeleted] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async (_event) => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await dispatch(updateBlog({ id: blog.id, newBlog }))
    if (updatedBlog) {
      setBlog(updatedBlog)
    }
  }

  const _deleteBlog = async (_event) => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      await dispatch(deleteBlog(blog.id))
      setDeleted(true)
    }
  }

  return (
    !deleted && (
      <div style={blogStyle} className="Blog">
        {blog.title}
        <button id="show-hide-button" onClick={(_event) => setShowDetail(!showDetail)}>
          {showDetail ? 'hide' : 'view'}
        </button>
        <div style={hideWhenVisible} className="hideContents">
          <p>{blog.url}</p>
          likes {blog.likes}
          <button id="like-button" onClick={addLike}>
            like
          </button>
          <p>{blog.author}</p>
          {canDelete && (
            <button id="delete-button" onClick={_deleteBlog}>
              Remove
            </button>
          )}
        </div>
      </div>
    )
  )
}

export default Blog
