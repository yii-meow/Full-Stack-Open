import { useState } from 'react'
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState([])
  const [isFilter, setIsFilter] = useState(false)

  // Filter name, case insensitive
  const handleFilterNameChange = (event) => {
    if (event.target.value !== "") {
      setIsFilter(true)
    }

    let regex = new RegExp(event.target.value, "i")

    setFilteredName(persons.filter(person => regex.test(person.name)))
  }

  // Submit Form
  const handleForm = (event) => {
    event.preventDefault()

    // If person name is duplicated
    if (persons.filter(person => person.name === newName).length !== 0) {
      alert(`${newName} is already added to phonebook`)
    }

    else {
      const newPerson = {
        "name": newName,
        'number': newNumber
      }

      setPersons([...persons, newPerson])
    }

    setNewName("")
    setNewNumber("")
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

      <Persons persons={persons} filteredName={filteredName} isFilter={isFilter} />

    </div>
  )
}

export default App