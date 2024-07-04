import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setErrorMessage(`Login Fail`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    setUser(null);
    blogService.setToken(null);
    delete window.localStorage.loggedNoteappUser;
  };

  const addNewBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.createNew({
        title: title,
        author: author,
        url: url,
        likes: 0,
      });

      setBlogs(blogs.concat(newBlog));
      event.target.reset();
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exception) {
      console.log(exception);
      console.log("add failed");
    }
  };

  return (
    <div>
      <Notification message={errorMessage} />
      <Login
        user={user}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      ></Login>
      <h2>blogs</h2>
      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      {user && (
        <NewBlog
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
          addNewBlog={addNewBlog}
        ></NewBlog>
      )}
    </div>
  );
};

export default App;
