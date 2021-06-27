import React from 'react'

const Person = ({person, deletePerson}) => {
  return (
    <pre className='person'>
      {person.name} {person.number} <button onClick={deletePerson}>delete</button>
    </pre>
  )
}

export default Person
