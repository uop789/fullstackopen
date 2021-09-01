import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Countries from './components/Countries';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [query, setQuery] = useState('');

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
			setCountries(response.data);
		});
	}, []);

	const filteredCountries =
		query.length === 0
			? countries
			: countries.filter(
					(c) => c.name.toLowerCase().indexOf(query.toLowerCase()) > -1
			  );

	return (
		<>
			<Search query={query} setQuery={setQuery} />
			<Countries countries={filteredCountries} setQuery={setQuery} />
		</>
	);
};

export default App;
