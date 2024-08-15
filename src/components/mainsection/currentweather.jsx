import React from "react";

function CurrentWeather({ data }) {
  // Correctly construct the full URL for the weather icon
  const iconUrl = data.icon.startsWith("http")
    ? data.icon
    : `https:${data.icon}`;

  return (
    <div className="shadow-xl bg-blue-50 rounded-lg p-12 mt-12 flex flex-col items-center space-y-8 relative z-30 custom-width mx-auto">
      <h2 className="text-4xl font-bold items-center text-black">
        {data.location}
      </h2>
      <div className="flex items-center text-5xl font-semibold text-black">
        <img
          src={iconUrl} // Use dynamic icon URL
          className="w-16 h-16"
          alt={data.condition}
        />
        <h1 className="text-6xl text-black">{data.temperature}°C</h1>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-2xl text-black">{data.condition}</p>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-xl text-black">H: {data.humidity}%</p>
        <p className="text-xl text-black">W: {data.wind} km/h</p>
      </div>
    </div>
  );
}

export default CurrentWeather;
