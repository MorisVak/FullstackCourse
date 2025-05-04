import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
console.log(apiKey);

const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api`;

const getAllCountrys = () => {
  const request = axios.get(baseUrl + "/all");
  return request.then((response) => response.data);
};

const getChosenCountry = (name) => {
  const request = axios.get(baseUrl + `/name/${name}`);
  return request.then((response) => response.data);
};

export default {
  getAllCountrys,
  getChosenCountry,
};
