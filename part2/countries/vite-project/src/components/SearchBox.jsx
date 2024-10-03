
const SearchBox = ({handleSubmit, handleInput}) => {


  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleInput} />
          <button>search</button>
        </form>
      </>
    );
  };
  
  export default SearchBox;
  