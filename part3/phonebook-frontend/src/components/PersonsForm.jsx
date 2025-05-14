const PersonsForm = ({
  onPersonSumbit,
  onNameChange,
  onNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <div>
      <form onSubmit={onPersonSumbit}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonsForm;
