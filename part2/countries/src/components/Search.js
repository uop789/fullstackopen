import React from 'react';

const Search = ({ query, setQuery }) => {
	const handleSearch = (event) => {
		setQuery(event.target.value);
	};

	return (
		<div>
			<div>
				find countries <input value={query} onChange={handleSearch} />
			</div>
		</div>
	);
};

export default Search;
