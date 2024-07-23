import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ _blog, canDelete }) => {
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

  const addLike = async (event) => {
    blog.likes += 1
    const updatedBlog = await blogService.updateBlog({
      id: blog.id,
      newBlog: blog
    })
    if (updatedBlog) {
      setBlog(updatedBlog)
    }
  }

  const deleteBlog = async (event) => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      await blogService.deleteBlog({ id: blog.id })
      setDeleted(true)
    }
  }

  return (
    !deleted && (
      <div style={blogStyle} className="Blog">
        {blog.title}
        <button onClick={(event) => setShowDetail(!showDetail)}>{showDetail ? 'hide' : 'view'}</button>
        <div style={hideWhenVisible} className='hideContents'>
          <p>{blog.url}</p>
          likes {blog.likes}
          <button onClick={addLike}>like</button>
          <p>{blog.author}</p>
          {canDelete && <button onClick={deleteBlog}>Remove</button>}
        </div>
      </div>
    )
  )
}

export default Blog
