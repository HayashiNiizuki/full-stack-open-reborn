import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Togglable";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const newBlogRef = useRef();

  const login = async ({username, password}) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
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

  const addNewBlog = async ({ title, author, url }) => {
    try {
      const newBlog = await blogService.createNew({
        title: title,
        author: author,
        url: url,
        likes: 0,
      });

      setBlogs(blogs.concat({ ...newBlog, user: { id: user.id } }));
      newBlogRef.current.toggleVisibility();
      return newBlog;
    } catch (exception) {
      console.log(exception);
      console.log("add failed");
      return null;
    }
  };

  return (
    <div>
      <Notification message={errorMessage} />
      <Login
        user={user}
        login={login}
        handleLogout={handleLogout}
      ></Login>
      <h2>blogs</h2>
      {user &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              _blog={blog}
              canDelete={blog.user.id === user.id}
            />
          ))}
      {user && (
        <Togglable buttonLabel="New blog" ref={newBlogRef}>
          <NewBlog addNewBlog={addNewBlog}></NewBlog>
        </Togglable>
      )}
    </div>
  );
};

export default App;
