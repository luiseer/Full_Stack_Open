import { useState } from 'react'
import SearchBox from './components/SearchBox'
import { getAll } from './services/getAll'


function App() {

  const [countries, setCountries] = useState({})

  console.log(getAll)
  

  return (
    <>
      <h1>Countries</h1>
      <SearchBox countries={countries}/>
    </>
  )
}

export default App
