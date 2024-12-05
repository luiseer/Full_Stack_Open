const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const notificationClass = type === 'error' ? 'error' : 'success'

  console.log(message)
  console.log(type)

  return (
    <div className={`message ${notificationClass}`}>
      {message}
    </div>
  )
}

export default Notification
