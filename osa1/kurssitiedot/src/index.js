import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => (
  <div>
    <p>{props.nimi} {props.tehtavat}</p>
  </div>
)

const Header = (props) => (

  <div>
    <h1>{props.course}</h1>
  </div>
)

const Content = (props) => (
  <div>
    <Part nimi={props.nimi[0]} tehtavat={props.tehtavat[0]}/>
    <Part nimi={props.nimi[1]} tehtavat={props.tehtavat[1]}/>
    <Part nimi={props.nimi[2]} tehtavat={props.tehtavat[2]}/>
  </div>
)

const Total = (props) => (
  <div>
    <p>Number of exercises {props.total}</p>
  </div>
)

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

  return (
    <div>
      <Header course={course.name}/>
      <Content nimi={[course.parts[0].name, course.parts[1].name, course.parts[2].name]} tehtavat={[course.parts[0].exercises, course.parts[1].exercises, course.parts[2].exercises]} />
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
