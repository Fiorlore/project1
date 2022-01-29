import React, { useState } from "react";
import axios from "axios";


export default function Weather() {
  const [temperature, setTemperature] = useState("null");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [cityName, setCityName] = useState("");
  const [icon, setIcon] = useState("");
  const [loaded, setLoaded] = useState(false);

  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let apiKey = "889ddb82ac517574ec1ec04289422270";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showWeather);
  }

  function showWeather(response) {
    setLoaded(true);
    setCityName(response.data.name);
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Type a city" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div>
        {form}
        <br />
        <b>{cityName}</b>
        <ul>
          <li>Temperature: {Math.round(temperature)}°C</li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity}%</li>
          <li>Wind: {Math.round(wind)} km/h</li>
          <li>
            <img src={icon} alt="weathericon" />
          </li>
        </ul>
        <p>< a href="https://priceless-blackwell-9ed501.netlify.app/">coded</a> by Anna Kwiatkowska</p>
      </div>
    );
  } else {
    return form;
  }
}