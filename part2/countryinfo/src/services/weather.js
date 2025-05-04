import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
console.log(apiKey);

const getWeatherDataForCountry = (name) => {
  const request =
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric
`);
  return request.then((response) => response.data);
};

export default {
  getWeatherDataForCountry,
};
