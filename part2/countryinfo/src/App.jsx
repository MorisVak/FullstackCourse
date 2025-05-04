import { useState, useEffect } from "react";
import CountryInfo from "./components/countryInfo";
import SearchForm from "./components/searchForm";
import countryService from "./services/country";

function App() {
  const [country, setNewCountry] = useState("");
  const [countryNameList, newCountryNameList] = useState(null);
  const [filteredCountryNameList, newFilteredNameList] = useState([]);
  const [countryList, newCountryList] = useState([]);
  const [singleChosenCountry, setNewChosenCountry] = useState(null);

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

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value);
    const filteredCountrys = countryNameList.filter((name) =>
      name.toLowerCase().includes(`${event.target.value.toLowerCase()}`)
    );
    newFilteredNameList(filteredCountrys);
    console.log(filteredCountrys.length);
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
          console.log(singleChosenCountry);
        });
    }
  };
  if (!singleChosenCountry) {
    return (
      <div>
        <h1>Country Info</h1>
        <SearchForm country={country} onCountryChange={handleCountryChange} />
        <CountryInfo filteredCountryList={filteredCountryNameList} />
      </div>
    );
  } else {
    console.log(singleChosenCountry.name);

    return (
      <div>
        <h1>Country Info</h1>
        <SearchForm country={country} onCountryChange={handleCountryChange} />
        <CountryInfo
          filteredCountryList={filteredCountryNameList}
          singleCountry={singleChosenCountry}
        />
      </div>
    );
  }
}

export default App;
