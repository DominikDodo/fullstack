const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

// nevermind...
const Content = (props) => {
  return (
  <>
  <p>
    {props.parts[0].name} {props.parts[0].exercises}
  </p>
  <p>
    {props.parts[1].name} {props.parts[1].exercises}
  </p>
  <p>
    {props.parts[2].name} {props.parts[2].exercises}
  </p>
  </>
  )
}

const Part = (props) => {
  return (
    <>
    <p>{props.p.name} {props.p.exercises}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[0].exercises + props.parts[0].exercises}</p>  
  )
}

const App = () => {
  const course = {
    course_name: 'Half Stack application development',
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
      <Header name={course.course_name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App