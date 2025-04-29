const SearchForm = ({ country, onCountryChange }) => {
  return (
    <div>
      <form>
        <input value={country} onChange={onCountryChange}></input>
      </form>
    </div>
  );
};

export default SearchForm;
