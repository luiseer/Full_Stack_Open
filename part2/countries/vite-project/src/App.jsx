import { useState, useEffect } from 'react'
import SearchBox from './components/SearchBox'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState('')

  const handleInput = (e) =>{
    setCountries(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countries}`)
      .then(response => console.log(response.data))
    }
    
  


  return (
    <>
      <h1>Countries</h1>
      <SearchBox handleInput={handleInput} handleSubmit={handleSubmit}/>

    </>
  )
}

export default App


