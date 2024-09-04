import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 0,
      name: 'Arto Hellas',
      // tel: '5544332211'
    }
  ])
  const [newName, setNewName] = useState()
  // const [newTell, setnewTell] = useState('');

  const handleAddName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    
  }
  

  return(
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input
            placeholder='name'
            type='text'
            value={newName}
            onChange={handleAddName}/>
          {/* tel: <input type="text" /> */}
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(person =>
            <li key={person.id}>{person.name}</li>
          )
        }
      </ul>
    </>
  )
}

export default App