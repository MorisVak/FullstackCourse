import { useState, useEffect } from "react";
import CountryInfo from "./components/countryInfo";
import SearchForm from "./components/searchForm";
import countryService from "./services/country";
import weatherService from "./services/weather";

function App() {
  const [country, setNewCountry] = useState("");
  const [countryNameList, newCountryNameList] = useState(null);
  const [filteredCountryNameList, newFilteredNameList] = useState([]);
  const [countryList, newCountryList] = useState([]);
  const [singleChosenCountry, setNewChosenCountry] = useState(null);
  const [weatherOfChosenCountry, setNewWeatherOfChosenCountry] = useState(null);

  const getCountryHook = () => {
    countryService.getAllCountrys().then((allCountrys) => {
      newCountryList(allCountrys);
      const names = allCountrys.map((countrys) => countrys.name.common);
      newCountryNameList(names);
      newFilteredNameList(names);
      console.log("COUNTRY LIST \n", countryNameList);
    });
  };
  useEffect(getCountryHook, []);

  const handleShowButtonClick = (name) => {
    newFilteredNameList([name]);
    countryService.getChosenCountry(name).then((pickedCountry) => {
      const filteredPickedCountry = {
        name: pickedCountry.name.common,
        capital: pickedCountry.capital,
        area: pickedCountry.area,
        languages: pickedCountry.languages,
        flag: pickedCountry.flags.png,
      };
      console.log(filteredPickedCountry);
      setNewChosenCountry(filteredPickedCountry);
      console.log(singleChosenCountry);
    });
    weatherService.getWeatherDataForCountry(name).then((weatherData) => {
      const weather = {
        temp: weatherData.main.temp,
        icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        wind: weatherData.wind.speed,
      };
      console.log(weather);
      setNewWeatherOfChosenCountry(weather);
    });
  };

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value);
    const filteredCountrys = countryNameList.filter((name) =>
      name.toLowerCase().includes(`${event.target.value.toLowerCase()}`)
    );

    newFilteredNameList(filteredCountrys);
    if (filteredCountrys.length == 1) {
      countryService
        .getChosenCountry(filteredCountrys[0])
        .then((pickedCountry) => {
          const filteredPickedCountry = {
            name: pickedCountry.name.common,
            capital: pickedCountry.capital,
            area: pickedCountry.area,
            languages: pickedCountry.languages,
            flag: pickedCountry.flags.png,
          };
          console.log(filteredPickedCountry);
          setNewChosenCountry(filteredPickedCountry);
        });
      weatherService
        .getWeatherDataForCountry(filteredCountrys[0])
        .then((weatherData) => {
          const weather = {
            temp: weatherData.main.temp,
            icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
            wind: weatherData.wind.speed,
          };
          console.log(weather);
          setNewWeatherOfChosenCountry(weather);
        });
    } else {
      setNewChosenCountry(null);
      setNewWeatherOfChosenCountry(null);
    }
  };

  if (!singleChosenCountry && !weatherOfChosenCountry) {
    return (
      <div>
        <h1>Country Info</h1>
        <SearchForm country={country} onCountryChange={handleCountryChange} />
        <CountryInfo
          filteredCountryList={filteredCountryNameList}
          onClickShowButton={handleShowButtonClick}
        />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Country Info</h1>
        <SearchForm country={country} onCountryChange={handleCountryChange} />
        <CountryInfo
          filteredCountryList={filteredCountryNameList}
          singleCountry={singleChosenCountry}
          weatherOfCountry={weatherOfChosenCountry}
          onClickShowButton={handleShowButtonClick}
        />
      </div>
    );
  }
}

export default App;
