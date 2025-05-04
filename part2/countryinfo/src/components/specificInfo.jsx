const SpecificInfo = ({ countryName, capital, area, languages, flag }) => {
  const extractedLanguages = Object.values(languages);
  console.log(extractedLanguages);

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
    </div>
  );
};

export default SpecificInfo;
