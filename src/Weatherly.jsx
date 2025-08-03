import React, { useState } from 'react';

const Weatherly = () => {
  const [city, setcity] = useState('');
  const [weather, setweather] = useState(null);
  const [error, setError] = useState('');


  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
 const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const getWeather = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

     if (res.ok) {
      setweather(data);
      setError(''); // clear error if request is successful
      console.log(data);
    } else {
      setweather(null);
      setError('City not found. Please try again.');
    }
  } catch (error) {
    setweather(null);
    setError('Something went wrong. Try again later.');
    console.error('Fetch failed:', error);
  }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    getWeather();
    setcity('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">🌦️ Weatherly</h1>
      
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setcity(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="submit"
          value="Check Weather"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition"
        />
      </form>
      {error && (
        <p className="text-red-600 mt-4 text-center font-medium">{error}</p>
        )}

      {weather && (
        <div className="mt-8 bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-xl p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800">{weather.name}, {weather.sys.country}</h2>
          <p className="text-xl text-gray-700 mt-2">🌡️ Temp: {weather.main.temp}°C</p>
          <p className="text-gray-600 mt-1 capitalize">☁️ {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weatherly;
