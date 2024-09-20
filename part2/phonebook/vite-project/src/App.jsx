import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/personServices'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newTelephone, setNewTelephone] = useState('')
  const [findName, setFindName] = useState('')

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [persons])
    
  // Manejar el cambio de nombre en el formulario
  const handleAddName = (event) => setNewName(event.target.value)

  // Manejar el cambio de teléfono en el formulario
  const handleAddTelephone = (event) => setNewTelephone(event.target.value)

  // Agregar un nuevo contacto
  const addContact = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} already exists`)
      setNewName('') // Limpiar el campo de texto después de agregar
    } else {
      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newTelephone
      }

      personServices
        .createPerson(personObject)
        .then(returPerson => {
          setPersons(persons.concat(returPerson))
        })
      
      // setPersons(persons.concat(personObject))

      setNewName('') // Limpiar el campo de texto después de agregar
      setNewTelephone('')
    }
  }

  // Filtrar los nombres según lo que se busca
  const handleFind = (event) => setFindName(event.target.value)
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(findName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter findName={findName} handleFind={handleFind} />

      <h3>Add a new</h3>
      <PersonForm 
        addContact={addContact}
        newName={newName}
        handleAddName={handleAddName}
        newTelephone={newTelephone}
        handleAddTelephone={handleAddTelephone}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App
