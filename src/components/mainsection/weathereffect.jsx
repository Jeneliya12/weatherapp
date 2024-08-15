const effectClasses = {
  rain: "rainy-effect",
  thunderstorm: "thunderstorm-effect",
  storm: "thunderstorm-effect",
  sunny: "sunny-effect",
  clear: "clear-effect",
  cloud: "cloudy-effect",
};

function WeatherEffect({ condition }) {
  const normalizedCondition = condition?.toLowerCase().trim();

  const getEffectClass = () => {
    for (const [key, value] of Object.entries(effectClasses)) {
      if (normalizedCondition.includes(key)) {
        return value;
      }
    }
    return "";
  };

  return (
    <div
      className={`absolute inset-0 ${getEffectClass()} z-10 pointer-events-none`}
    ></div>
  );
}

export default WeatherEffect;
