import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Filter from './components/Filter'
import service from './services/persons'

const Notification = ({errorMessage}) => {
  console.log("redErrorin tila on " + errorMessage.red)
  if (errorMessage.message === null) {
    return null
  }

  if (errorMessage.red === true) {

    return (
      <div className='redError'>
        {errorMessage.message}
      </div>
    )
  }

  return (
    <div className='greenError'>
     {errorMessage.message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState({message: null, red: true})

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
            setErrorMessage({message: `Updated ${searchedPerson.name}'s number`, red: false})
            setTimeout(() => {
              setErrorMessage({message: null, red: false})
            }, 2000)

           })
            .catch(error => {
              setErrorMessage({message: `${searchedPerson.name} was already deleted from server`, red: true})
              // setRedError(true)
              setTimeout(() => {
                setErrorMessage({message: null, red: false})
              }, 2000)
              // setRedError(false)


            })

          }
    } else {

      const personObject = {
        name: newName,
        number: newNumber,

      }

      service
        .create(personObject)
        .then(person => {
          setPersons(persons.concat(person.data))
          setNewName('')
          setNewNumber('')
          setErrorMessage(
            {message: `Added '${personObject.name}'`, red: false}
          )
          setTimeout(() => {
            setErrorMessage({message: null, red: false})
          }, 2000)
        })
        .catch(error => {

          setErrorMessage({message: `${error.response.data.error}`, red: true})

          setTimeout(() => {
            setErrorMessage(
              {message: null, red: false}
            )
          }, 3000)

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
        setErrorMessage({message: `Deleted ${searchedPerson.name}`, red: false})
        setTimeout(() => {
          setErrorMessage({message: null, red: false})
        }, 2000)
      })
      .catch(error => {
        setErrorMessage(
          {message: `${searchedPerson.name} was already deleted from server`, red: true}
        )
        // setRedError(true)
        setTimeout(() => {
          setErrorMessage({message: null, red: false})
        }, 2000)
        // setRedError(false)

      })


  }


  return (
    <div>
      <h1>Phonebook</h1>

      <Notification errorMessage={errorMessage}/>
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
