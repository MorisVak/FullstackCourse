const SpecificInfo = ({
  countryName,
  capital,
  area,
  languages,
  flag,
  temp,
  wind,
  icon,
}) => {
  const extractedLanguages = Object.values(languages);
  return (
    <div>
      <h2>{countryName}</h2>
      <p>{capital}</p>
      <p>{area}</p>
      <h2>Languages</h2>
      <ul>
        {extractedLanguages.map((extractedLanguages, index) => (
          <li key={index}> {extractedLanguages}</li>
        ))}
      </ul>
      <img src={flag}></img>
      <h2>Weather in {capital}</h2>
      <p>Temperature {temp} Celsius</p>
      <img src={icon}></img>
      <p>Wind {wind} m/s</p>
    </div>
  );
};

export default SpecificInfo;
