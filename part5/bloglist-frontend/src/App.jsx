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

  // Definir los estados para el formulario de blogs
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

      blogService.getAll().then(blogs => {
        setBlogs(blogs)
      })
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
      setErrorMessage(null)
    } catch (exception) {
      console.error('Error de login:', exception)
      setErrorMessage('Wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    console.log('Logging out...')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
  
    // Verifica si 'user' tiene un 'id'
    if (!user || !user.id) {
      console.error('User is not logged in or user ID is missing')
      return
    }
  
    const blogObject = {
      title: title,
      author: user.id,  // Asegúrate de que 'author' sea el ObjectId del usuario
      url: url,
      user: user.id     // Si el backend lo espera, pasa también el 'user.id'
    }
  
    blogService.create(blogObject).then(returnBlog => {
      setBlogs(blogs.concat(returnBlog))  // Agregar el blog creado al estado
      setTitle('')
      setAuthor('')
      setUrl('')
    }).catch(error => {
      console.error('Error creating blog:', error)
      setErrorMessage('Error creating blog')
    })
  }
  
  

  return (
    <div>
      <h1>Welcome</h1>
      <Notification message={errorMessage} />
      {
        !user ? (
          <>
            <h3>Login to application</h3>
            <LoginForm
              handleSubmit={handleLogin}
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUserName(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
            />
          </>
        ) : (
          <>
            <h3>Create New Blog</h3>
            {
              console.log(user)
            }
            <BlogForm
              title={title}
              author={author}
              url={url}
              handleBlogChange={({ target }) => {
                if (target.name === 'title') setTitle(target.value)
                if (target.name === 'author') setAuthor(target.value)
                if (target.name === 'url') setUrl(target.value)
              }}
              handleSubmit={addBlog}
            />
            <ul>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </ul>
            <div>
              <span>{user.username} logged in</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        )
      }
    </div>
  )
}

export default App
