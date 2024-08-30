

// Componente Header
const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

// Componente Part
const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

// Componente Content
const Content = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <p><strong>Total number of exercises: {totalExercises}</strong></p>
    </div>
  );
};

// Componente Course
const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
