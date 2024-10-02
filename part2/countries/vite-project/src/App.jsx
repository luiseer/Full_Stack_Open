import { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import { getAll } from './services/getAll';

function App() {
  const [query, setQuery] = useState('');
  const [countriesData, setCountriesData] = useState([]);

  const inputSearch = (e) => setQuery(e.target.value);

  useEffect(() => {
    if (query) {
      getAll({ name: query })
        .then((data) => {
          setCountriesData([data]); // La API devuelve un objeto, lo convertimos en un array
        })
        .catch((error) => {
          console.error('Error fetching countries:', error);
          setCountriesData([]); // Limpiamos los datos en caso de error
        });
    } else {
      setCountriesData([]); // Limpiamos los datos si no hay query
    }
  }, [query]);

  return (
    <>
      <h1>Countries</h1>
      <SearchBox inputSearch={inputSearch} />
      {countriesData.length > 10 && <p>Too many matches, specify another filter</p>}
      {countriesData.length <= 10 &&
        countriesData.length > 1 &&
        countriesData.map((country) => <p key={country.name}>{country.name}</p>)}
      {countriesData.length === 1 && (
        <div>
          <h2>{countriesData[0].name.common}</h2>
          <p>Capital: {countriesData[0].capital}</p>
          <p>Population: {countriesData[0].population}</p>
          <img src={countriesData[0].flags.png} alt={`Flag of ${countriesData[0].name.common}`} width="100" />
        </div>
      )}
    </>
  );
}

export default App;


