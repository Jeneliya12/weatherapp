import React from "react";

function WeeklyForecast({ data }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-8 relative z-30">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Weekly Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {data.map((day, index) => {
          const iconUrl = day.icon.startsWith("http")
            ? day.icon
            : `https://cdn.weatherapi.com/weather/64x64/day/${day.icon}.png`;

          return (
            <div key={index} className="flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-800">{day.day}</p>
              <img src={iconUrl} alt={day.condition} className="w-12 h-12" />
              <p className="text-xl font-medium text-gray-800">
                {day.temperature}°C
              </p>
              <p className="text-sm text-gray-600">{day.condition}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyForecast;
