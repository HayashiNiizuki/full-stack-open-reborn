import { useEffect, useMemo, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable.jsx'
import './App.css'
import { createBlog, initializeBlogs, selectSortedBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer.js'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(selectSortedBlogs)
  const user = useSelector((state) => state.user)
  const errorMessage = useSelector((state) => state.errorMessage)

  const blogItems = useMemo(() => {
    if (!user) {
      return null
    } else {
      return blogs.map((blog) => <Blog key={blog.id} _blog={blog} canDelete={blog.user.id === user.id} />)
    }
  }, [blogs, user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const newBlogRef = useRef()

  const addNewBlogFunc = async ({ title, author, url }) => {
    try {
      const newBlog = await dispatch(createBlog({ title, author, url }))
      newBlogRef.current.toggleVisibility()
      return newBlog
    } catch (exception) {
      console.log(exception)
      console.log('add failed')
      return null
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <Login></Login>
      <h2>blogs</h2>
      {user && blogItems}
      {user && (
        <Toggleable buttonLabel="New blog" ref={newBlogRef}>
          <NewBlog addNewBlog={addNewBlogFunc}></NewBlog>
        </Toggleable>
      )}
    </div>
  )
}

export default App
