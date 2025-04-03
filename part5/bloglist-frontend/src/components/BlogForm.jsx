const BlogForm = ({
    title,
    author,
    url,
    handleBlogChange, 
    handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title: </label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleBlogChange}
                />
            </div>
            <div>
                <label htmlFor="author">Author: </label>
                <input
                    id="author"
                    type="text"
                    name="author"
                    value={author}
                    onChange={handleBlogChange}
                />
            </div>
            <div>
                <label htmlFor="url">URL: </label>
                <input
                    id="url" 
                    type="text"
                    name="url"
                    value={url}
                    onChange={handleBlogChange} />
            </div>
            <button type="submit">Submit</button>
        </form>
    )
}

export default BlogForm