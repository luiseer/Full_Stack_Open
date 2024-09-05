import { useState } from 'react'
import SearchBox from './components/SearchBox'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas',
      tel: '5544332211'
    },
    { 
      id: 2, 
      name: 'Ada Lovelace', 
      number: '39-44-5323523', 
    },
    { 
      id: 3, 
      name: 'Dan Abramov', 
      number: '12-43-234345', 
    },
    { 
      name: 'Mary Poppendieck', 
      number: '39-23-6423122', 
      id: 4 
    }
  ])
  const [newName, setNewName] = useState('')
  const [newTelephone, setNewTelephone] = useState('')

  const handleAddName = (event) => {
    setNewName(event.target.value)
  }

  const handleAddTelephone = (event) => {
    setNewTelephone(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    // Verificar si el nombre ya está en la lista
    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} already exists`)
      setNewName('') // Limpiar el campo de texto después de agregar
    } else {
      const personObject = {
        id: persons.length + 1,
        name: newName,
        tel: newTelephone
      }
      
      setPersons(persons.concat(personObject))
      setNewName('') // Limpiar el campo de texto después de agregar
      setNewTelephone('')
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      {/* Pasar 'persons' como prop al SearchBox */}
      <SearchBox persons={persons} />
        
      <h2>Add new</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input
            placeholder='name'
            type='text'
            value={newName}
            onChange={handleAddName}
          />
        </div>
        <div>
          phone: <input 
            type="text" 
            placeholder='phone'
            value={newTelephone}
            onChange={handleAddTelephone}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.id}>{person.name} {person.tel}</li>
        )}
      </ul>
    </>
  )
}

export default App

