import Header from "./Header"
import Content from "./Content"


const Course = ({ course }) =>{
    
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
        
    return(
        <>
            <Header tittle={course.name}/>
            <Content parts={course.parts}/>
            {<p><strong>Total of Exercises: </strong> {totalExercises}</p>}
        </>
    )
}

export default Course