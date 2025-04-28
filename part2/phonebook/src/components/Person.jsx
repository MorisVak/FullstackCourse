const Person = ({ name, number, onDelete }) => {
  return (
    <div>
      <p>
        {name} {number}
        <button id="windowButton" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default Person;
