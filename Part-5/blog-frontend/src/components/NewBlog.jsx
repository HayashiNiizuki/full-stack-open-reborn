const NewBlog = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  addNewBlog,
}) => {
  return (
    <div>
      <h2>add new blog</h2>
      <form onSubmit={addNewBlog}>
        title:
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        ></input>
        <br />
        author:
        <input
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        ></input>
        <br />
        url:
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        ></input>
        <br />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlog;
