import React from "react";

const HourlyForecast = ({ data }) => {
  return (
    <div className="bg-blue-50 shadow-lg rounded-lg p-6 mt-4 relative z-30">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Hourly Forecast</h3>
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {data.map((hour, index) => {
          const iconUrl = hour.icon.startsWith("http")
            ? hour.icon
            : `https://cdn.weatherapi.com/weather/64x64/day/${hour.icon}.png`;

          return (
            <div key={index} className="flex-none w-24 text-center">
              <p className="text-sm font-medium text-gray-800">{hour.time}</p>
              <img
                src={iconUrl}
                alt={hour.condition}
                className="w-12 h-12 mx-auto"
              />
              <p className="text-lg font-bold text-gray-800">
                {hour.temperature}°C
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
