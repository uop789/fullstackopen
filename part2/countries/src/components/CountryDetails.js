import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather';

const CountryDetails = ({ country }) => {
	const [weather, setWeather] = useState(null);
	const api_key = process.env.REACT_APP_API_KEY;
	const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`;

	useEffect(() => {
		axios.get(url).then((response) => {
			setWeather(response.data.current);
		});
	}, []);

	return (
		<>
			<h2>{country.name}</h2>
			<div>capital {country.capital}</div>
			<div>population {country.population}</div>
			<h3>Spoken languages</h3>
			<ul>
				{country.languages.map((lang) => (
					<li key={lang.iso639_2}>{lang.name}</li>
				))}
			</ul>
			<div>
				<img src={country.flag} height="80px" alt="flag" />
			</div>
			<Weather weather={weather} city={country.capital} />
		</>
	);
};

export default CountryDetails;
