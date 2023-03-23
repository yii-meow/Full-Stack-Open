import { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import phonebooksService from './services/phonebooks'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState([])
  const [isFilter, setIsFilter] = useState(false)

  // Initializing the data of persons
  useEffect(() => {
    phonebooksService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])

  // Filter name, with case insensitive
  const handleFilterNameChange = (event) => {
    // If value is typed in filter bar, then only show eligible name
    if (event.target.value !== "") {
      setIsFilter(true)
    }

    let regex = new RegExp(event.target.value, "i")

    // Only return people who match regex
    setFilteredName(persons.filter(person => regex.test(person.name)))
  }

  // Submit Form and add person
  const handleForm = (event) => {
    event.preventDefault()

    // If person name is duplicated
    if (persons.find(p => p.name === newName)) {

      // Asking for confirmation, and replace phone no of the person
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )) {
        // Find the person
        const personToUpdate = persons.find(p => p.name === newName)

        // Modify the person's phone no
        const modifiedPerson = { ...personToUpdate, number: newNumber }
        
        const personToUpdateId = personToUpdate.id

        phonebooksService
          .replacePhoneNo(personToUpdateId, modifiedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== personToUpdateId ? p : returnedPerson))
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
    else {
      const newPerson = {
        "name": newName,
        'number': newNumber
      }

      phonebooksService
        .addPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }

    setNewName("")
    setNewNumber("")
  }

  const deletePerson = (id) => {
    const personName = persons.find(p => p.id === id).name

    if (window.confirm("Delete " + personName + " ?")) {
      phonebooksService
        .deletePerson(id)
        .then(deletedPerson => {
          console.log(deletedPerson)
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  // Handle Name Input Change
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Handle Phone No Input Change
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <Filter handleFilterNameChange={handleFilterNameChange} />

      <PersonForm handleForm={handleForm} newName={newName} newNumber={newNumber}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons persons={persons} filteredName={filteredName} isFilter={isFilter} deletePerson={deletePerson} />

    </div>
  )
}

export default App