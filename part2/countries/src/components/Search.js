import React from 'react';

const Search = ({ query, setQuery }) => {
	const handleSearch = (event) => {
		setQuery(event.target.value);
	};

	return (
		<div>
			find countries <input value={query} onChange={handleSearch} />
		</div>
	);
};

export default Search;
