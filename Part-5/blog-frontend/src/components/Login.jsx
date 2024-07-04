const Login = ({
  user,
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
  handleLogout,
}) => {
  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  } else {
    return (
      <div>
        <p>{user.name} logged-in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
    );
  }
};

export default Login;
