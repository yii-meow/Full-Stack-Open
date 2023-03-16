const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.contents[0].name} exercise={props.contents[0].exercises} />
      <Part part={props.contents[1].name} exercise={props.contents[1].exercises} />
      <Part part={props.contents[2].name} exercise={props.contents[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

const App = () => {
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

  let total = () => {
    let sum = 0;

    course.parts.map((a) => {
      sum += a.exercises
    })

    return sum;
  }

  return (
    <div>
      <Header course={course.name} />
      <Content contents={course.parts} />
      <Total total={total()} />
    </div>
  )
}

export default App