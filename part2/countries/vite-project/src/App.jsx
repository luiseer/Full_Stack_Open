import { useState, useEffect } from 'react'
import SearchBox from './components/SearchBox'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [findCountrie, setFindCountrie] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleFind = (event) => setFindCountrie(event.target.value)

  // Filtrar los países según la búsqueda
  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(findCountrie.toLowerCase())
  )

  // Función para manejar el clic en el botón "show"
  const handleClick = (country) => {
    setSelectedCountry(country)
  }

  // Renderizar los países según el número de coincidencias
  const renderCountries = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return (
        <ul>
          {filteredCountries.map(country => (
            <li key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleClick(country)}>show</button>
            </li>
          ))}
        </ul>
      )
    } else if (filteredCountries.length === 1) {
      return renderCountryDetails(filteredCountries[0])
    } else {
      return <p>No matches found</p>
    }
  }

  // Función para renderizar los detalles de un país
  const renderCountryDetails = (country) => {
    const languages = Object.values(country.languages).join(', ')

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Languages: <strong>{languages}</strong></p>
        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="100" />
      </div>
    )
  }

  return (
    <>
      <h1>Countries</h1>
      <SearchBox  
        handleFind={handleFind} 
        findCountrie={findCountrie}
      />
      {selectedCountry ? renderCountryDetails(selectedCountry) : renderCountries()}
    </>
  )
}

export default App