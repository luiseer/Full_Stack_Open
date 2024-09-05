import { useState } from 'react'

const SearchBox = ({ persons }) => {
  const [findName, setFindName] = useState('')

  const handleFind = (event) => {
    setFindName(event.target.value) // Actualiza el nombre que se busca
  }

  // Filtra los nombres que coinciden con el valor ingresado
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(findName.toLowerCase())
  )

  return (
    <>
      <form>
        filter show with: 
        <input  
          type="text"
          placeholder="search name"
          value={findName}
          onChange={handleFind} // Actualiza el valor del input
        />
      </form>
      <h2>Find People</h2>
      <ul>
        {filteredPersons.map(person => (
          <li key={person.id}>{person.name} {person.tel}</li> // Muestra los nombres filtrados
        ))}
      </ul>
    </>
  )
}

export default SearchBox
