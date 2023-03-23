import { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState([])
  const [isFilter, setIsFilter] = useState(false)

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])

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