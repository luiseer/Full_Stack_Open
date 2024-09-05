import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 0,
      name: 'Arto Hellas',
      tel: '5544332211'
    }
  ]);
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
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
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

export default App;
