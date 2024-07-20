import PropTypes from "prop-types";
import { useState } from "react";

const Login = ({ user, login, handleLogout }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  if (user === null) {
    const handleLogin = async (event) => {
      event.preventDefault();
      await login({ username, password });
    };
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
}

export default Login;
