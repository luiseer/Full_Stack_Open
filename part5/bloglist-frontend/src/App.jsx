import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogService'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
  
      // 🔹 Asegurar que getAll() se llama después de setToken()
      blogService.getAll().then(blogs => {
        console.log('Blogs:', blogs); // Verifica si llegan los blogs
        setBlogs(blogs);
      })
    }
  }, [])
  


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    noteService.setToken(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = { 
      title: title, 
      author: author,
      url: url 
    }
    blogService.create(blogObject).then(returnBlog => {
      setBlogs(blogs.concat(returnBlog))
      setNewNote('')
    })
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage}/>
      {
        !user ? (
          <LoginForm
            handleSubmit={handleLogin}
            username={username}
            password={password}
            handleUsernameChange={({target}) => setUserName(target.value)}
            handlePasswordChange={({target}) => setPassword(target.value)}
          />
        ) : (
          <>
            <BlogForm
              handleSubmit={addBlog} />
            <ul>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </ul>
            <button onClick={handleLogout}>Logout</button>
          </>
        )

      }

    </div>
  )
}

export default App