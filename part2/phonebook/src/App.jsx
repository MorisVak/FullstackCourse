import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
  const [newName, setNewName] = useState("");

  const addNewPerson = (event) => {
    event.preventDefault();

    if (persons.some((val) => val.name === newName)) {
      alert(`${newName} is already in the List. Enter a different name!`);
    } else if (newName === "") {
      alert("Please enter a name");
    } else {
      const newPerson = {
        name: newName,
        id: String(persons.length + 1),
      };
      setPersons(persons.concat(newPerson));
      setNewName("");
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <p key={person.id}>{person.name}</p>
        ))}
      </ul>
    </div>
  );
};

export default App;
