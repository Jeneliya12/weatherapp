import React from "react";
import Mainsection from "../components/mainsection/mainsection";
import { WeatherProvider } from "../components/context/weathercontext";

function Home() {
  return (
    <WeatherProvider>
      <Mainsection />
    </WeatherProvider>
  );
}
export default Home;
