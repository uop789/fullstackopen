import React from 'react';
import CountryDetails from './CountryDetails';

const Countries = ({ query, result, handleShow }) => {
  if (query === '' || result.length === 0) {
    return <div></div>;
  } else if (result.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (result.length <= 10 && result.length > 1) {
    return result.map(country => {
      return (
        <div key={country.name}>
          {country.name}{' '}
          <button value={country.name} onClick={handleShow}>
            show
          </button>
        </div>
      );
    });
  } else {
    return <CountryDetails country={result[0]} />;
  }
};

export default Countries;
