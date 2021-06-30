import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Filter from './components/Filter'
import service from './services/persons'

const Notification = ({message, redError}) => {

  if (message === null) {
    return null
  }

  if (redError) {
    return (
      <div className='redError'>
        {message}
      </div>
    )
  }

  return (
    <div className='greenError'>
     {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ redError, setRedError ] = useState(false)

  useEffect(() => {
    service
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  function nameCheck(name, list) {

    for (var i = 0; i < list.length; i++) {

      if (list[i].name === name) {
        return 1
      }
    }
    return 0


  }


  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked')


    if (nameCheck(newName, persons) === 1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        const searchedPerson = persons.find(p => p.name === newName)
        const changedPerson = { ...searchedPerson, number: newNumber }

        service
          .update(searchedPerson.id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== searchedPerson.id ? person : response.data))
            setErrorMessage(`Updated ${searchedPerson.name}'s number`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000)

           })
            .catch(error => {
              setErrorMessage(
                `${searchedPerson.name} was already deleted from server`
              )
              setRedError(true)
              setTimeout(() => {
                setErrorMessage(null)
              }, 2000)

            })

          }
    } else {

      const personObject = {
        name: newName,
        number: newNumber,

      }

      service
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setErrorMessage(
            `Added '${personObject.name}'`
          )
          setTimeout(() => {
          setErrorMessage(null)
        }, 2000)

        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch (event.target.value)
  }

  const deletePerson = id => {
    const searchedPerson = persons.find(p => p.id === id)
    console.log(searchedPerson)
    if (window.confirm(`Delete ${searchedPerson.name}`))
    service
      .deletePerson(id)
      .then(response => {
        setPersons(persons.filter(n => n.id !== id))
        setErrorMessage(`Deleted ${searchedPerson.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      })
      .catch(error => {
        setErrorMessage(
          `${searchedPerson.name} was already deleted from server`
        )
        setRedError(true)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)

      })


  }


  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={errorMessage} redError={redError}/>
      <Filter handleChange={handleSearch}/>

      <PersonForm add={addPerson} handleName={handleNameChange} handleNumber={handleNumberChange} name={newName} number={newNumber} />

      <h2>Numbers</h2>
          {search === ''
          ? persons.map((person, key) =>
            <div key={person.id}>
              <Person person={person} deletePerson={() => deletePerson(person.id)}/>
            </div>
            )
          : persons.filter(person => person.name.toUpperCase().includes(search.toUpperCase()))
            .map((person, key) =>
              <div key={person.id}>
                <Person person={person} deletePerson={() => deletePerson(person.id)}/>
              </div>
            )
          }
    </div>
  )
}
export default App
