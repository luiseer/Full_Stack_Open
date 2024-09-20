const Filter = ({ findName, handleFind }) => {
    return (
      <div>
        filter shown with: 
        <input
          placeholder="type a letter"
          type="text" 
          value={findName} 
          onChange={handleFind} 
        />
      </div>
    );
  };
  
  export default Filter;
  