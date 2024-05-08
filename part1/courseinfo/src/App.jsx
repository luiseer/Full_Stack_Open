const App = () => {
  const course = 'Half Stack aplication developemt'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return(
    <div>
      <h1>{course}</h1>
      <p>{parts[0].name}, excercises {parts[0].exercises}</p>
      <p>{parts[1].name}, excercises {parts[1].exercises}</p>
      <p>{parts[2].name}, excercises {parts[2].exercises}</p>
    </div>
  )
}

export default App