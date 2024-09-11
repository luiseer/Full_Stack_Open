const Filter = ({ findName, handleFind }) => {
    return (
      <div>
        filter shown with: 
        <input 
          type="text" 
          value={findName} 
          onChange={handleFind} 
        />
      </div>
    );
  };
  
  export default Filter;
  