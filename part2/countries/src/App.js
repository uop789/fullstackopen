import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';
const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = event => {
    setQuery(event.target.value);
  };

  const handleShow = event => {
    setQuery(event.target.value);
  };
  const result = countries.filter(country => {
    return country.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div>
      <div>
        find countries <input value={query} onChange={handleSearch} />
      </div>
      <Countries query={query} result={result} handleShow={handleShow} />
    </div>
  );
};

export default App;
