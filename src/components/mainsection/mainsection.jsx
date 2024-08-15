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
      const currentResponse = await fetch(currentUrl);
      if (!currentResponse.ok)
        throw new Error(
          `Error fetching current weather: ${currentResponse.statusText}`
        );
      const currentData = await currentResponse.json();

      const hourlyResponse = await fetch(hourlyUrl);
      if (!hourlyResponse.ok)
        throw new Error(
          `Error fetching hourly forecast: ${hourlyResponse.statusText}`
        );
      const hourlyData = await hourlyResponse.json();

      const weeklyResponse = await fetch(weeklyUrl);
      if (!weeklyResponse.ok)
        throw new Error(
          `Error fetching weekly forecast: ${weeklyResponse.statusText}`
        );
      const weeklyData = await weeklyResponse.json();

      return { current: currentData, hourly: hourlyData, weekly: weeklyData };
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  const fetchWeatherDataByQuery = async (query) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;

    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Error fetching weather data: ${response.statusText}`);
      const data = await response.json();

      return {
        current: data,
        hourly: { forecast: { forecastday: [] } },
        weekly: { forecast: { forecastday: [] } },
      };
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
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && <WeatherEffect condition={weatherData.condition} />}
      <div className="relative w-full max-w-4xl px-4">
        <SearchBar onSearch={handleSearch} />
        {weatherData && <CurrentWeather data={weatherData} />}
        {hourlyData.length > 0 && <HourlyForecast data={hourlyData} />}
        {weeklyData.length > 0 && <WeeklyForecast data={weeklyData} />}
      </div>
    </main>
  );
}

export default Mainsection;
