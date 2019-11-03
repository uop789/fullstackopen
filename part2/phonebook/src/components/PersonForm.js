import React from 'react';

const PersonForm = props => {
  return (
    <form onSubmit={props.addPerson}>
      <p>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </p>
      <p>
        {`number: `}
        <input
          type="tel"
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </p>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
