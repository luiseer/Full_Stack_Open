import ReactDOM from 'react-dom'

const Header = ({ course }) => {

  return (
    <h1>
      Name of course: {course}
    </h1>
  )
}


export const Content = ({ parts }) => {
  return (
    <>
      {
        parts.map(part => (
          <ul>
            <li>{part.name}, {part.exercises}</li>
          </ul>
        ))
      }
    </>
  )
}

export const Total = ({ parts }) => {
  const result = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return (
    <>
     <p>Total of exercises {result}</p>
    </>
  )
}

const App = (props) => {

  const course = 'Half Stack application development'
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
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))