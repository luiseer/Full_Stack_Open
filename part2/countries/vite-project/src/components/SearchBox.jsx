const SearchBox = ({ handleFind, findCountrie }) => {
  return (
    <form>
      <input value={findCountrie} onChange={handleFind} placeholder="Search for a country" />
    </form>
  )
}

export default SearchBox