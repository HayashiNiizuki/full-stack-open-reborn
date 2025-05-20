import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../reducers/loginReducer'
import { TextField, Button } from '@mui/material'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginfo = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    await dispatch(login(username, password))
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    await dispatch(logout())
  }
  if (loginfo === null) {
    return (
      <form onSubmit={handleLogin}>
        <div className="TextField">
          <TextField
            size="small"
            label="username"
            id="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className="TextField">
          <TextField
            size="small"
            label="password"
            id="password-input"
            type="password"
            value={password}
            name="Password"
            sx={{ height: 40 }}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button size="small" variant="contained" color="primary" id="login-button" type="submit">
          login
        </Button>
      </form>
    )
  } else {
    return (
      <div style={{ marginTop: 5 }}>
        {loginfo.name} logged-in
        <Button style={{ marginLeft: 5 }} size="small" variant="contained" color="primary" onClick={handleLogout}>
          logout
        </Button>
      </div>
    )
  }
}

export default Login
