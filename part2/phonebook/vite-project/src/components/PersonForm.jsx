const PersonForm = ({ addContact, newName, handleAddName, newTelephone, handleAddTelephone }) => {
    return (
      <form onSubmit={addContact}>
        <div>
          name: 
          <input 
            placeholder="name"
            type="text"
            value={newName}
            onChange={handleAddName}
          />
        </div>
        <div>
          phone: 
          <input 
            type="text" 
            placeholder="phone"
            value={newTelephone}
            onChange={handleAddTelephone}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };
  
  export default PersonForm;
  