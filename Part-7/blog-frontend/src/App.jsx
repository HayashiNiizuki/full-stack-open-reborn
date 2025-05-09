import { useState, useEffect, useRef, useMemo } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import './App.css'
import { initializeBlogs, selectSortedBlogs, addNewBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const dispatch = useDispatch()

  const blogs = useSelector(selectSortedBlogs)

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
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const newBlogRef = useRef()

  const login = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      console.log(exception)
      setErrorMessage(`Login Fail`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    setUser(null)
    blogService.setToken(null)
    delete window.localStorage.loggedNoteappUser
  }

  const addNewBlogFunc = async ({ title, author, url }) => {
    try {
      const newBlog = await dispatch(addNewBlog({ title, author, url }))
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
      <Login user={user} login={login} handleLogout={handleLogout}></Login>
      <h2>blogs</h2>
      {user && blogItems}
      {user && (
        <Togglable buttonLabel="New blog" ref={newBlogRef}>
          <NewBlog addNewBlog={addNewBlogFunc}></NewBlog>
        </Togglable>
      )}
    </div>
  )
}

export default App
