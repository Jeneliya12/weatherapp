import React, { useState, useEffect } from "react";
import SearchBar from "../searchbar";
import WeatherEffect from "./weathereffect";
import CurrentWeather from "./currentweather";
import HourlyForecast from "./hourlyforecast";
import WeeklyForecast from "./weeklyforecast";

function Mainsection() {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = query
          ? await fetchWeatherDataByQuery(query)
          : await fetchWeatherDataByLocation();
        processWeatherData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const fetchWeatherData = async (lat, lon) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const currentUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
    const hourlyUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&hours=24`;
    const weeklyUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7`;

    try {
      const [currentResponse, hourlyResponse, weeklyResponse] =
        await Promise.all([
          fetch(currentUrl),
          fetch(hourlyUrl),
          fetch(weeklyUrl),
        ]);

      if (!currentResponse.ok)
        throw new Error(
          `Error fetching current weather: ${currentResponse.statusText}`
        );
      if (!hourlyResponse.ok)
        throw new Error(
          `Error fetching hourly forecast: ${hourlyResponse.statusText}`
        );
      if (!weeklyResponse.ok)
        throw new Error(
          `Error fetching weekly forecast: ${weeklyResponse.statusText}`
        );

      const [currentData, hourlyData, weeklyData] = await Promise.all([
        currentResponse.json(),
        hourlyResponse.json(),
        weeklyResponse.json(),
      ]);

      return { current: currentData, hourly: hourlyData, weekly: weeklyData };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  const fetchWeatherDataByQuery = async (query) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const currentUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;
    const hourlyUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&hours=24`;
    const weeklyUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7`;

    try {
      const [currentResponse, hourlyResponse, weeklyResponse] =
        await Promise.all([
          fetch(currentUrl),
          fetch(hourlyUrl),
          fetch(weeklyUrl),
        ]);

      if (!currentResponse.ok)
        throw new Error(
          `Error fetching current weather: ${currentResponse.statusText}`
        );
      if (!hourlyResponse.ok)
        throw new Error(
          `Error fetching hourly forecast: ${hourlyResponse.statusText}`
        );
      if (!weeklyResponse.ok)
        throw new Error(
          `Error fetching weekly forecast: ${weeklyResponse.statusText}`
        );

      const [currentData, hourlyData, weeklyData] = await Promise.all([
        currentResponse.json(),
        hourlyResponse.json(),
        weeklyResponse.json(),
      ]);

      return { current: currentData, hourly: hourlyData, weekly: weeklyData };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  const fetchWeatherDataByLocation = async () => {
    if (!navigator.geolocation) {
      throw new Error("Geolocation is not supported by this browser.");
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await fetchWeatherData(latitude, longitude);
            resolve(data);
          } catch (error) {
            reject(error);
          }
        },
        (error) => reject(new Error("Error getting user location:", error))
      );
    });
  };

  const processWeatherData = (data) => {
    setWeatherData({
      location: data.current.location.name,
      temperature: data.current.current.temp_c,
      condition: data.current.current.condition.text,
      icon: `https:${data.current.current.condition.icon}`,
      humidity: data.current.current.humidity,
      wind: data.current.current.wind_kph,
    });

    const formatTime = (time24) => {
      const [hour, minute] = time24.split(":").map(Number);
      const period = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
    };

    setHourlyData(
      data.hourly.forecast.forecastday[0]?.hour.map((hour) => ({
        time: formatTime(hour.time.split(" ")[1]),
        temperature: hour.temp_c,
        icon: `https:${hour.condition.icon}`,
        condition: hour.condition.text,
      })) || []
    );

    setWeeklyData(
      data.weekly.forecast.forecastday?.map((day) => ({
        day: new Date(day.date).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        temperature: day.day.avgtemp_c,
        icon: `https:${day.day.condition.icon}`,
        condition: day.day.condition.text,
      })) || []
    );
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery.query);
  };

  return (
    <main className="bg-blue-50 py-8 min-h-screen flex flex-col items-center relative overflow-hidden">
      {loading && <p className="text-lg text-gray-600">Loading...</p>}
      {error && <p className="text-lg text-red-600">Error: {error}</p>}
      {weatherData && <WeatherEffect condition={weatherData.condition} />}
      <div className="relative w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-1">
            {weatherData && <CurrentWeather data={weatherData} />}
          </div>
          <div className="lg:col-span-2 flex flex-col space-y-6">
            {hourlyData.length > 0 && <HourlyForecast data={hourlyData} />}
            {weeklyData.length > 0 && <WeeklyForecast data={weeklyData} />}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Mainsection;
