import { useState, useEffect } from "react";
import CountryInfo from "./components/countryInfo";
import SearchForm from "./components/searchForm";
import countryService from "./services/country";

function App() {
  const [country, setNewCountry] = useState("");
  const [countryNameList, newCountryNameList] = useState(null);
  const [filteredCountryNameList, newFilteredNameList] = useState([]);
  const [countryList, newCountryList] = useState([]);

  const getCountryHook = () => {
    countryService.getAllCountryNames().then((allCountrys) => {
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
      const singularCountryData = countryList.filter((countrys) => {
        return countrys.name.common === filteredCountrys[0];
      });
    }
  };
  return (
    <div>
      <h1>Country Info</h1>
      <SearchForm country={country} onCountryChange={handleCountryChange} />
      <CountryInfo
        filteredCountryList={filteredCountryNameList}
        allCountrys={countryList}
      />
    </div>
  );
}

export default App;
