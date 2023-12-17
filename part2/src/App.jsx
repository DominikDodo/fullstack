import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ siteMessage, setSiteMessage] = useState(null)
  const [ siteMessageType, setSiteMessageType ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  // function to create new name
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      // receives content from the components newName state
      name: newName,
      number: newNumber,
    }

    const existing_names = persons.map(person => person.name)

    if (existing_names.includes(newName)) {
      const msg = `${newName} is already added to the phonebook. Replace the old number with the new one?`
      const confirm = window.confirm(msg)
      if (confirm) {
        updateName(nameObject)
      }
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          resetNewState()
          setSiteMessage(`Added ${returnedPerson.name}.`)
          setSiteMessageType('info')
          setTimeout(() => {
            setSiteMessage(null)
          }, 5000)
        })
    }
  }

  const updateName = (nameObject) => {
    const update_person = persons.find(p => p.name === nameObject.name)
    const update_id = update_person.id
    personService
    .update(update_id, nameObject)
    .then(returnedPerson =>
      setPersons(persons.map(person => person.id !== update_id ? person : returnedPerson))
    )
    .catch(error => {
      setSiteMessage(`Note ${nameObject.name} not found. ${error}`)
      setSiteMessageType('error')
      setTimeout(() => {
        setSiteMessage(null)
      }, 5000)
      setPersons(persons.filter(p => p.id !== update_id))
    })
  }

  const deleteName = (person) => {
    const msg = `Delete ${person.name}?`
    const confirm = window.confirm(msg)
    if (confirm) {
      personService
        .deletePerson(person.id)
        .then(persons =>
          setPersons(persons)
    )}
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const resetNewState = () => {
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = newFilter ?
    persons.filter(person => person.name.toLowerCase().includes(newFilter)) :
    persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={siteMessage} type={siteMessageType} />
      filter shown with <input type="text" value={newFilter} onChange={handleFilterChange} />
      <h2>Add new contact</h2>
      <form onSubmit={addName}>
        <div>
          name: <input  type='text' value={newName} onChange={handleNameChange} /><br />
          number: <input  type='text' value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <Person
            key={person.name}
            person={person}
            deleteEntry={() => deleteName(person)} />
        )}
      </ul>
    </div>
  )
}

export default App