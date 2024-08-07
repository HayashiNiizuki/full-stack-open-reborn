import { useState } from 'react'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const userToken = await login(username, password)
    if (userToken) {
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          username
          <input id='username' value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          password
          <input id='password' type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
