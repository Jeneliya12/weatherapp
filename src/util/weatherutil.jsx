export const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;
export const convertToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

export const formatTime = (time24) => {
  const [hour, minute] = time24.split(":").map(Number);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
};

export const processWeatherData = (
  data,
  setWeatherData,
  setHourlyData,
  setWeeklyData
) => {
  setWeatherData({
    location: data.current.location.name,
    temperature: data.current.current.temp_c,
    condition: data.current.current.condition.text,
    icon: `https:${data.current.current.condition.icon}`,
    humidity: data.current.current.humidity,
    wind: data.current.current.wind_kph,
  });

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
      day: new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }),
      temperature: day.day.avgtemp_c,
      icon: `https:${day.day.condition.icon}`,
      condition: day.day.condition.text,
    })) || []
  );
};
