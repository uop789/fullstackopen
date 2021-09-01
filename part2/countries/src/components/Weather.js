import React from 'react';

const Weather = ({ weather, city }) => {
	if (!weather) {
		return null;
	}
	return (
		<>
			<h3>Weather in {city}</h3>
			<div>
				<strong>temperature: </strong> {weather.temperature} Celsius
			</div>
			<img
				src={weather.weather_icons[0]}
				alt={weather.weather_descriptions[0]}
			/>
			<div>
				<strong>wind: </strong>
				{weather.wind_speed} mph direction {weather.wind_dir}
			</div>
		</>
	);
};

export default Weather;
