const LoginForm = ({ 
    username, 
    password, 
    handleUsernameChange, 
    handlePasswordChange, 
    handleSubmit 
}) => (
    <form onSubmit={handleSubmit}>
        <div>
            <h3>Login in to application</h3>
            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                value={username}
                name="Username"
                onChange={handleUsernameChange}
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                value={password}
                name="Password"
                onChange={handlePasswordChange}
            />
        </div>
        <button type="submit">Login</button>
    </form>
)

export default LoginForm
