import { useState, useEffect } from 'react'
import SearchBox from './components/SearchBox'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [findCountrie, setFindCountrie] = useState('')

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleFind = (event) => setFindCountrie(event.target.value)

  // Ahora filtramos por el nombre del país (estado) en lugar de la capital
  const filterCountries = countries.filter(countrie => 
    countrie.name.common.toLowerCase().includes(findCountrie.toLowerCase())
  )

  console.log(filterCountries.length)
  

  return (
    <>
      <h1>Countries</h1>
      <SearchBox  
        handleFind={handleFind} 
        findCountrie={findCountrie}
        filterCountries={filterCountries}
      />
    </>
  )
}

export default App



