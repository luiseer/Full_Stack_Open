const Blog = ({ blog }) => {
  return (
    <div>
      <h3>Title: {blog.title}</h3>
      <p>Author: {blog.author.username}</p>
      <p>URL: {blog.url}</p>
    </div>
  );
};


export default Blog