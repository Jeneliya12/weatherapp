const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

// Build URL for API requests
const buildUrl = (endpoint, params = "") =>
  `https://api.weatherapi.com/v1/${endpoint}.json?key=${apiKey}&${params}`;

// Fetch data from a given URL and handle errors
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Fetch weather data by latitude and longitude
export const fetchWeatherData = async (lat, lon) => {
  const urls = {
    current: buildUrl("current", `q=${lat},${lon}`),
    hourly: buildUrl("forecast", `q=${lat},${lon}&hours=24`),
    weekly: buildUrl("forecast", `q=${lat},${lon}&days=7`),
  };

  try {
    const [currentData, hourlyData, weeklyData] = await Promise.all([
      fetchData(urls.current),
      fetchData(urls.hourly),
      fetchData(urls.weekly),
    ]);

    return { current: currentData, hourly: hourlyData, weekly: weeklyData };
  } catch (error) {
    console.error("Error fetching weather data by coordinates:", error);
    throw error;
  }
};

// Fetch weather data by search query
export const fetchWeatherDataByQuery = async (query) => {
  const urls = {
    current: buildUrl("current", `q=${query}`),
    hourly: buildUrl("forecast", `q=${query}&hours=24`),
    weekly: buildUrl("forecast", `q=${query}&days=7`),
  };

  try {
    const [currentData, hourlyData, weeklyData] = await Promise.all([
      fetchData(urls.current),
      fetchData(urls.hourly),
      fetchData(urls.weekly),
    ]);

    return { current: currentData, hourly: hourlyData, weekly: weeklyData };
  } catch (error) {
    console.error("Error fetching weather data by query:", error);
    throw error;
  }
};

// Fetch weather data based on the user's location
export const fetchWeatherDataByLocation = async () => {
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
          reject(new Error("Error fetching weather data by location:", error));
        }
      },
      (error) => reject(new Error("Error getting user location:", error))
    );
  });
};
