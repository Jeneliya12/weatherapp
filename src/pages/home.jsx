import React from "react";
import Mainsection from "../components/mainsection/mainsection";
import { WeatherProvider } from "../components/mainsection/weathercontext";

function Home() {
  return (
    <WeatherProvider>
      <Mainsection />
    </WeatherProvider>
  );
}
export default Home;
