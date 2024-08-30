import Header from "./Header"
import Content from "./Content"


const Course = ({ course }) =>{

    let totalExercises = 0

    for (let i = 0; i < course.parts.length; i++) {
        totalExercises += course.parts[i].exercises
    }

    console.log(totalExercises);
    
        
    return(
        <>
            <Header tittle={course.name}/>
            <Content parts={course.parts}/>
            <p><strong>Total of Exercises: </strong> {totalExercises}</p>
        </>
    )
}

export default Course