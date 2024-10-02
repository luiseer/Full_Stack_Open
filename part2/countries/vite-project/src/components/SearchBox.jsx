const SearchBox = ({ inputSearch }) => {
    const handleSubmit = (event) => {
      event.preventDefault(); // Previene el refresco de la página
    };
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={inputSearch} />
          <button type="submit">search</button>
        </form>
      </>
    );
  };
  
  export default SearchBox;
  