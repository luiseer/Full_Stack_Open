const Blog = ({ blog }) => {
  return (
    <div>
      <h3>Blog</h3>
      <li>Title: {blog.title} Author: {blog.author.username} URL: {blog.url}</li>
    </div>
  );
};


export default Blog