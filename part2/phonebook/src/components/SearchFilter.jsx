const SearchFilter = ({ onFiltering }) => {
  return (
    <div>
      <input onChange={onFiltering} />
    </div>
  );
};

export default SearchFilter;
