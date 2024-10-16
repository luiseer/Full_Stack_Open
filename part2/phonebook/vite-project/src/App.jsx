import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/personServices'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newTelephone, setNewTelephone] = useState('')
  const [findName, setFindName] = useState('')
  const [messageState, setMessageState] = useState(null)

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    }, [])
    
  // Manejar el cambio de nombre en el formulario
  const handleAddName = (event) => setNewName(event.target.value)

  // Manejar el cambio de teléfono en el formulario
  const handleAddTelephone = (event) => setNewTelephone(event.target.value)

  // Agregar un nuevo contacto
  const addContact = (event) => {
    event.preventDefault()
  
    const personExists = persons.find(person => person.name === newName)
  
    if (personExists) {
      // Confirmación antes de actualizar el número
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with the new one?`)) {
        const updatedPerson = { ...personExists, number: newTelephone }
  
        personServices
          .updatePerson(personExists.id, updatedPerson) // Actualiza con PUT
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== personExists.id ? person : returnedPerson
            ))
            setNewName('')
            setNewTelephone('')
          })
          .catch(error => {
          console.log(error)
            alert(`The contact '${newName}' was already removed from the server`)
            setPersons(persons.filter(person => person.id !== personExists.id))
          })
      }
    } else {
      // Si el nombre no existe, crea un nuevo contacto
      const newPerson = {
        name: newName,
        number: newTelephone
      }
      
      personServices
        .createPerson(newPerson) // Crea con POST
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          
          setMessageState('Person add ok')
          setNewName('')
          setNewTelephone('')

          setTimeout(() => {
            setMessageState(null)
          }, 3000)

        })
    }
  }
  

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
  
    if (personToDelete && window.confirm(`Delete ${personToDelete.name}?`)) {
      personServices
        .deletePerson(String(id))  // Convertir el ID a string
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setMessageState(`The person '${personToDelete.name}' was already removed from the server`)
          console.log(error.error)
          setPersons(persons.filter(person => person.id !== id)) 
        })
    }
}

  // Filtrar los nombres según lo que se busca
  const handleFind = (event) => setFindName(event.target.value)
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(findName.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter findName={findName} handleFind={handleFind} />

      <Notification message={messageState}/>

      <h3>Add a new</h3>
      <PersonForm 
        addContact={addContact}
        newName={newName}
        handleAddName={handleAddName}
        newTelephone={newTelephone}
        handleAddTelephone={handleAddTelephone}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} handleDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App
