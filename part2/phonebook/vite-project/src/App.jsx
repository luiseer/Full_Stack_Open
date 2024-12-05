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
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with the new one?`)) {
        const updatedPerson = { ...personExists, number: newTelephone }

        personServices
          .updatePerson(personExists.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== personExists.id ? person : returnedPerson
            ))
            setMessageState(`Updated ${returnedPerson.name}`)
            setNewName('')
            setNewTelephone('')
            setTimeout(() => setMessageState(null), 3000)
          })
          .catch(error => {
            setMessageState(error.response?.data?.error || 'An error occurred')
            setPersons(persons.filter(person => person.id !== personExists.id))
            setTimeout(() => setMessageState(null), 3000)
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newTelephone
      }
      personServices
        .createPerson(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessageState({ message: 'Person added successfully', type: 'success' })
          setNewName('')
          setNewTelephone('')
          setTimeout(() => setMessageState(null), 3000)
        })
        .catch(error => {
          // Captura el error y lo establece en el estado de mensaje
          const errorMessage = error || 'An unexpected error occurred'
          setMessageState({ message: errorMessage, type: 'error' })
          setTimeout(() => setMessageState(null), 3000)
        })
    }
  }

  const handleDeletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)

    if (personToDelete && window.confirm(`Delete ${personToDelete.name}?`)) {
      personServices
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error('Error during deletion:', error)

          // Verifica si el error tiene datos del backend
          if (error.response && error.response.data.error) {
            setMessageState({ message: error.response.data.error, type: 'error' })
          } else {
            setMessageState({ message: `The person '${personToDelete?.name}' was already removed from the server`, type: 'error' })
          }

          // Filtra la lista de personas incluso si el servidor ya lo eliminó
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }


  // Filtrar los nombres según lo que se busca
  const handleFind = (event) => setFindName(event.target.value)

  const filteredPersons = persons.filter(person =>
    person?.name?.toLowerCase().includes(findName.toLowerCase())
  )

  console.log('Message type:', messageState?.type); // Asegúrate de que el tipo esté correctamente establecido


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter findName={findName} handleFind={handleFind} />

      <Notification
        message={messageState?.message}
        type={messageState?.type}
      />

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