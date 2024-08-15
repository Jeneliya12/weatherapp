import React, { useContext } from "react";
import WeatherContext from "../../context/weathercontext";
import { convertToFahrenheit } from "../../util/weatherutil";

const WeeklyForecast = ({ data }) => {
  const { unit } = useContext(WeatherContext);

  return (
    <div className="bg-blue-50 shadow-lg rounded-lg p-6 mt-8 relative z-30">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Weekly Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {data.map((day, index) => {
          const iconUrl = day.icon.startsWith("http")
            ? day.icon
            : `https://cdn.weatherapi.com/weather/64x64/day/${day.icon}.png`;

          const temperature =
            unit === "Celsius"
              ? day.temperature
              : convertToFahrenheit(day.temperature).toFixed(1);
          const unitSymbol = unit === "Celsius" ? "°C" : "°F";

          return (
            <div key={index} className="flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-800">{day.day}</p>
              <img
                src={iconUrl}
                alt={day.condition}
                className="w-12 h-12 mb-2"
              />
              <p className="text-xl font-medium text-gray-800">
                {temperature}
                {unitSymbol}
              </p>
              <p className="text-sm text-gray-600">{day.condition}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForecast;
