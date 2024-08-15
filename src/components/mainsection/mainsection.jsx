import React, { useContext } from "react";
import SearchBar from "../header/searchbar";
import WeatherEffect from "./weathereffect";
import CurrentWeather from "./currentweather";
import HourlyForecast from "./hourlyforecast";
import WeeklyForecast from "./weeklyforecast";
import WeatherContext from "../../context/weathercontext";

const Mainsection = () => {
  const { weatherData, hourlyData, weeklyData, loading, error, handleSearch } =
    useContext(WeatherContext);

  if (loading) {
    return <p className="text-lg text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-lg text-red-600">Error: {error}</p>;
  }

  return (
    <main className="bg-blue-50 py-8 min-h-screen flex flex-col items-center relative overflow-hidden">
      {weatherData && <WeatherEffect condition={weatherData.condition} />}
      <div className="relative w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {weatherData && (
            <div className="lg:col-span-1">
              <CurrentWeather data={weatherData} />
            </div>
          )}
          {(hourlyData.length > 0 || weeklyData.length > 0) && (
            <div className="lg:col-span-2 flex flex-col space-y-6">
              {hourlyData.length > 0 && <HourlyForecast data={hourlyData} />}
              {weeklyData.length > 0 && <WeeklyForecast data={weeklyData} />}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Mainsection;
