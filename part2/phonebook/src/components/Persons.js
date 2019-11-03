import React from 'react';

const Persons = props => {
  return props.personToShow.map(person => (
    <p key={person.id}>
      {`${person.name} ${person.number} `}
      <button onClick={() => props.handleDelete(person.id, person.name)}>
        delete
      </button>
    </p>
  ));
};

export default Persons;
