import ReactDOM from 'react-dom'

const Header = ({ course }) => {
  return (
    <h1>
      {course.name}
    </h1>
  )
}


export const Content = ({ course }) => {

  return (
    <>
      <ul>
        <li>{course.parts[0].name}, exercises, {course.parts[0].exercises}</li>
        <li>{course.parts[1].name}, exercises, {course.parts[1].exercises}</li>
        <li>{course.parts[2].name}, exercises, {course.parts[2].exercises}</li>
      </ul>
    </>
  )
}

export const Total = ({ course }) => {

  const result = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return (
    <>
      <p>Total of exercises {result}</p>
    </>
  )
}

const App = (props) => {

  const course = {

    name: 'Half Stack application development',

    parts: [
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
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))