import React from 'react'

const Part = ({ course }) => {

  return (
     <li>{course.name} <b>{course.exercises}</b></li>
  )
}

const Header = ({ course }) => (

  <div>
     <h2>{course}</h2>
  </div>
)

const Content = ({ osat }) => {
  return (
    <ul>
      {osat.map(kurssi =>
         <Part key={kurssi.id} course={kurssi} />
       )}
    </ul>
  )
}

const Total = ({ osat }) => {
  return (
    <p>
      <b>Total number of exercises {osat.reduce((sum, item) => sum + item.exercises, 0)}</b>
    </p>
  )
}



const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content osat={course.parts}/>
      <Total osat={course.parts}/>
    </div>
  )
}

export default Course
