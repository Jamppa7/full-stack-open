import React, { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import PersonsToShow from './components/PersonsToShow'
import Person from './components/Person'
import Message from './components/Message'
import Error from './components/Error'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(({ name }) => name === newName)

    if (persons.includes(person)) {
      if (person.number === newNumber) {
        window.alert(`${newName} is already added to phonebook.`)
      } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedNumber = { ...person, number: newNumber }

        personService
          .update(person.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .then(response => {
            setMessage(
              `Updated ${newName}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            setError(
              `The person ${person.name} was already deleted from server.`
            )
            setTimeout(() => {
              setError(null)
            }, 3000)
            setPersons(persons.filter(p => p.id !== person.id))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(nameObject)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
        })

      setMessage(
        `Added ${newName}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(response => {
          setMessage(
            `Deleted ${person.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setError(
            `The person ${person.name} was already deleted from server.`
          )
          setTimeout(() => {
            setError(null)
          }, 3000)
        })

      setPersons(persons.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <Error error={error} />
      <FilterForm filter={newFilter} handleFilter={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm add={addPerson} name={newName} handleName={handleNameChange} number={newNumber} handleNumber={handleNumberChange} />
      <h3>Numbers</h3>
      <ul>
        {PersonsToShow(persons, newFilter).map(p =>
          <Person key={p.id} name={p.name} number={p.number} remove={() => deletePerson(p.id)} />
        )}
      </ul>
    </div >
  )
}

export default App
