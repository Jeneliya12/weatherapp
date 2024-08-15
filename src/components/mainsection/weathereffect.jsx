import React from "react";

function WeatherEffect({ condition }) {
  const getEffectClass = () => {
    if (condition?.toLowerCase().includes("rain")) {
      return "rainy-effect";
    }
    if (
      condition?.toLowerCase().includes("sunny") ||
      condition?.toLowerCase().includes("clear")
    ) {
      return "sunny-effect";
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
