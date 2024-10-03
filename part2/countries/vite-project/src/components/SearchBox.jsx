const SearchBox = ({ handleFind, findCountrie, filterCountries }) => {
  return (
    <>
      <input 
        type="text" 
        onChange={handleFind} 
        value={findCountrie} 
        placeholder="Search by country"
      />
      
      <ul>
        {filterCountries.length > 0 ? (
          filterCountries.map((countrie, index) => (
            <li key={index}>{countrie.name.common}</li>
          ))
        ) : (
          <li>No results found</li>
        )}
      </ul>
    </>
  )
}

export default SearchBox
