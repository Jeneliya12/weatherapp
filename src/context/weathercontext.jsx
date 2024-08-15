import React, { createContext, useState, useEffect } from "react";
import {
  fetchWeatherDataByQuery,
  fetchWeatherDataByLocation,
} from "../api/weatherapi";
import { processWeatherData } from "../util/weatherutil";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("Celsius");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = query
          ? await fetchWeatherDataByQuery(query)
          : await fetchWeatherDataByLocation();

        processWeatherData(data, setWeatherData, setHourlyData, setWeeklyData);
      } catch (error) {
        setError("Failed to fetch weather data. Please try again later.");
        console.error("Fetch data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery.query);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "Celsius" ? "Fahrenheit" : "Celsius"));
  };

  const contextValue = {
    weatherData,
    hourlyData,
    weeklyData,
    loading,
    error,
    handleSearch,
    unit,
    toggleUnit,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
