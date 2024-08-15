import React, { useContext } from "react";
import WeatherContext from "../../context/weathercontext";
import { convertToFahrenheit } from "../../util/weatherutil";

const HourlyForecast = ({ data }) => {
  const { unit } = useContext(WeatherContext);

  return (
    <div className="bg-blue-50 shadow-lg rounded-lg p-6 mt-4 relative z-30">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Hourly Forecast</h3>
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {data.map((hour, index) => {
          const iconUrl = hour.icon.startsWith("http")
            ? hour.icon
            : `https://cdn.weatherapi.com/weather/64x64/day/${hour.icon}.png`;

          const temperature =
            unit === "Celsius"
              ? hour.temperature
              : convertToFahrenheit(hour.temperature).toFixed(1);
          const unitSymbol = unit === "Celsius" ? "°C" : "°F";

          return (
            <div key={index} className="flex-none w-24 text-center">
              <p className="text-sm font-medium text-gray-800 mb-1">
                {hour.time}
              </p>
              <img
                src={iconUrl}
                alt={`Weather icon for ${hour.condition}`}
                className="w-12 h-12 mx-auto mb-1"
              />
              <p className="text-lg font-bold text-gray-800 mb-1">
                {temperature}
                {unitSymbol}
              </p>
              <p className="text-sm text-gray-600">{hour.condition}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
