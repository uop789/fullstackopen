import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState('');

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=ea98bf770c9db4cd995bc6cfd504b397&query=${country.capital}`
      )
      .then(response => {
        setWeather(response.data.current);
        setIcon(response.data.current.weather_icons[0]);
      });
  }, [country.capital]);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>{`capital ${country.capital}`}</p>
      <p>{`population ${country.population}`}</p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        alt="flag of the country"
        src={country.flag}
        width="200px"
        height="100px"
      />
      <h2>Weather in {country.capital}</h2>
      <div>
        <p>
          <strong>temperature: </strong>
          {weather.temperature} Celsius
        </p>
        <img src={icon} alt="weather icon" />
        <p>
          <strong>wind: </strong>
          {weather.wind_speed} kph direction {weather.wind_dir}
        </p>
      </div>
    </div>
  );
};

export default CountryDetails;
