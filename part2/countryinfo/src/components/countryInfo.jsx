import Country from "./country";

const CountryInfo = ({ filteredCountryList, allCountrys }) => {
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
          <Country key={name} name={name} />
        ))}
      </div>
    );
  }
  const singularCountryData = allCountrys.filter(
    (countrys) => countrys.name.common === filteredCountryList[0]
  );
  return (
    <div>
      <h2>{singularCountryData.name}</h2>
    </div>
  );
};

export default CountryInfo;
