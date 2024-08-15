const HourlyForecast = ({ data }) => {
  return (
    <div className="w-full mt-4">
      <h3 className="text-xl font-semibold mb-4">Hourly Forecast</h3>
      <div className="flex overflow-x-auto space-x-4">
        {data.map((hour, index) => {
          // Ensure icon URL is correctly constructed
          const iconUrl = hour.icon.startsWith("http")
            ? hour.icon
            : `https://cdn.weatherapi.com/weather/64x64/day/${hour.icon}.png`;

          return (
            <div key={index} className="flex-none w-24 text-center">
              <p className="text-sm font-medium">{hour.time}</p>
              <img
                src={iconUrl}
                alt={hour.condition}
                className="w-12 h-12 mx-auto"
              />
              <p className="text-lg font-bold">{hour.temperature}°C</p>
              <p className="text-sm text-gray-600">{hour.condition}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HourlyForecast;
