import React, { useContext } from "react";
import WeatherContext from "../../context/weathercontext";

const CurrentWeather = ({ data }) => {
  const { unit, toggleUnit } = useContext(WeatherContext);

  const convertToFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  const displayTemperature =
    unit === "Celsius"
      ? data.temperature
      : convertToFahrenheit(data.temperature);

  const formattedTemperature = Math.round(displayTemperature);

  const iconUrl = data.icon.startsWith("http")
    ? data.icon
    : `https:${data.icon}`;

  const temperatureFontSize = unit === "Celsius" ? "text-5xl" : "text-4xl";

  return (
    <div className="bg-blue-50 shadow-lg rounded-lg p-10 mt-16 relative z-30 max-w-md mx-auto border">
      <div className="absolute top-4 left-4">
        <button
          onClick={toggleUnit}
          className="bg-gray-800 text-white px-3 py-1 rounded shadow-lg focus:outline-none text-sm"
        >
          {unit === "Celsius" ? "°F" : "°C"}
        </button>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        {data.location}
      </h2>
      <div className="flex flex-col items-center text-center mb-6">
        <img
          src={iconUrl}
          alt={`Weather icon showing ${data.condition}`}
          className="w-24 h-24 mb-3"
        />
        <h1 className={`font-bold text-gray-800 mb-1 ${temperatureFontSize}`}>
          {formattedTemperature}°{unit === "Celsius" ? "C" : "F"}
        </h1>
        <p className="text-lg font-medium text-gray-600">{data.condition}</p>
      </div>
      <div className="flex justify-around text-gray-600 mt-4">
        <div className="text-center">
          <p className="text-sm font-medium">Humidity</p>
          <p className="text-lg font-semibold">{data.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Wind</p>
          <p className="text-lg font-semibold">{data.wind} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
