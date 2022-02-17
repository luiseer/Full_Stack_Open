import ReactDOM from 'react-dom'

const Header = props => {
  return (
    <h1>
       name of course {props.name}
    </h1>
  )
}


export const Content = props => {
  return (
    <>
      <Part  part='Fundamentals of React' exsercises={10}/>
      <Part  part='Using props to pass data' exsercises={7}/>
      <Part  part='State of a component' exsercises={14}/>
    </>
  )
}



export const Part = (props) => {
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
      <Content/>
      <Total exercises={10 + 7 + 14}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))