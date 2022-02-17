import ReactDOM from 'react-dom'

const Header = props => {
  return (
    <h1>
       Name of course {props.name}
    </h1>
  )
}


export const Content = props => {
  return (
    <>
      <p>Part of course, {props.part} number of exercises, {props.exsercises}</p>
    </>
  )
}



export const Total = props => {
  return (
    <>
      <p>Number of exercises {props.exercises}</p>
    </>
    
  )
}


const App = () => {



  return (
    <div>
      <Header name='Half Stack application development'/>
      <Content part='Fundamentals of React' exsercises={10}/>
      <Content part='Using props to pass data' exsercises={7}/>
      <Content part='State of a component' exsercises={14}/>
      <Total exercises={10 + 7 + 14}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))