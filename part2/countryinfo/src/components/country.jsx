const Country = ({ name, onClickingShowButton }) => {
  return (
    <div>
      <p>
        {name}
        <button onClick={() => onClickingShowButton(name)}> Show</button>
      </p>
    </div>
  );
};

export default Country;
