import React from 'react';

const Filter = props => {
  return (
    <p>
      {`filter shown with `}
      <input value={props.searchName} onChange={props.handleSearchName} />
    </p>
  );
};

export default Filter;
