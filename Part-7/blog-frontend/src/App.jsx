import { useEffect, useMemo, useRef, useState } from 'react'
import Login from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import userService from './services/users'
import Toggleable from './components/Toggleable.jsx'
import './App.css'
import { createBlog, initializeBlogs, selectSortedBlogs } from './reducers/blogReducer'
import { setLogin } from './reducers/loginReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'
import BlogEntrance from './components/BlogEntrance.jsx'
import Blog from './components/Blog.jsx'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(selectSortedBlogs)
  const login = useSelector((state) => state.login)
  const [users, setUsers] = useState([])

  const blogItems = useMemo(() => {
    if (!login) {
      return null
    } else {
      return blogs.map((blog) => <BlogEntrance key={blog.id} blog={blog} />)
    }
  }, [blogs, login])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLogin(user))
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAll()
        setUsers(data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  })

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

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/blogs">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>
      <Notification />
      <Login></Login>
      <Routes>
        <Route
          path="/blogs"
          element={
            <div>
              <h2>blogs</h2>
              {login && blogItems}
              {login && (
                <Toggleable buttonLabel="New blog" ref={newBlogRef}>
                  <NewBlog addNewBlog={addNewBlogFunc}></NewBlog>
                </Toggleable>
              )}
            </div>
          }
        />
        <Route path="/blogs/:id" element={<Blog blogs={blogs}/>}/>
        <Route path="/users" element={<Users users={users}></Users>} />
        <Route path="/users/:id" element={<User users={users}></User>} />
        <Route
          path="/"
          element={
            <p>
              License Unless otherwise stated, all content on this website (including text, images, and original
              code snippets) is licensed under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0
              International License (CC BY-NC-ND 4.0). You are free to share the material with proper attribution,
              but you may not use it for commercial purposes or create derivative works. Website source code (if
              publicly available) may be licensed separately under an open-source license, such as the MIT License
              or GPL. Please refer to the specific repository for details. Disclaimer This website is provided "as
              is" without warranty of any kind. The owner is not responsible for any damages or issues caused by
              the use of this website or the information contained herein. For inquiries, please contact:
              [hayashi_niizuki@outlook.com]
            </p>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
