import { useState } from 'react'
import { useSelector } from 'react-redux'
import { login, logout } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    await dispatch(login(username, password))
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    await dispatch(logout())
  }
  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password-input"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    )
  } else {
    return (
      <div>
        <p>{user.name} logged-in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }
}

export default Login
