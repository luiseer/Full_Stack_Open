const App = () => {
  const course = 'Half Stack aplication developemt'
  const part1 = {
    name: 'Fundamentals of react',
    excercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    excercises: 7
  }
  const part3 = {
    name: 'State of component',
    excercises: 14
  }
  return(
    <div>
      <h1>{course}</h1>
      <p>{part1.name}, excercises {part1.excercises}</p>
      <p>{part2.name}, excercises {part2.excercises}</p>
      <p>{part3.name}, excercises {part3.excercises}</p>
    </div>
  )
}

export default App