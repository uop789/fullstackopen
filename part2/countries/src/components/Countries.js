import React from 'react';
import CountryDetails from './CountryDetails';

const Countries = ({ countries, setQuery }) => {
	if (countries.length === 0) {
		return <div>no matches</div>;
	}

	if (countries.length === 1) {
		return <CountryDetails country={countries[0]} />;
	}

	if (countries.length < 10) {
		return (
			<div>
				{countries.map((c) => (
					<div key={c.name}>
						{c.name} <button onClick={() => setQuery(c.name)}>show</button>
					</div>
				))}
			</div>
		);
	}

	return <div>Too many matches, specify another filter</div>;
};

export default Countries;
