import Country from "./country";
import SpecificInfo from "./specificInfo";

const CountryInfo = ({
  filteredCountryList,
  singleCountry,
  weatherOfCountry,
  onClickShowButton,
}) => {
  if (filteredCountryList.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  } else if (filteredCountryList.length == 0) {
    return (
      <div>
        <p>Country name not contained in list</p>
      </div>
    );
  } else if (
    filteredCountryList.length <= 10 &&
    filteredCountryList.length > 1
  ) {
    return (
      <div>
        {filteredCountryList.map((name) => (
          <Country
            key={name}
            name={name}
            onClickingShowButton={onClickShowButton}
          />
        ))}
      </div>
    );
  }
  if (singleCountry && weatherOfCountry) {
    return (
      <div>
        <SpecificInfo
          countryName={singleCountry.name}
          capital={singleCountry.capital}
          languages={singleCountry.languages}
          area={singleCountry.area}
          flag={singleCountry.flag}
          temp={weatherOfCountry.temp}
          wind={weatherOfCountry.wind}
          icon={weatherOfCountry.icon}
        />
      </div>
    );
  }
};

export default CountryInfo;
