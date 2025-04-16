import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./components/Person";
import PersonsForm from "./components/PersonsForm";
import SearchFilter from "./components/SearchFilter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setNewFilteredPersons] = useState([]);

  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("fullfilled");
      setPersons(response.data);
      setNewFilteredPersons(response.data);
    });
  };
  //eventHandler to call the hook function
  useEffect(hook, []);

  const addNewPerson = (event) => {
    event.preventDefault();

    if (persons.some((val) => val.name === newName)) {
      alert(`${newName} is already in the List. Enter a different name!`);
    } else if (newName === "" && newNumber === "") {
      alert("Please enter a name");
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1),
      };
      setPersons(persons.concat(newPerson));
      setNewFilteredPersons(filteredPersons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    const filteringFor = event.target.value;
    const filteredPeople = persons.filter((person) =>
      person.name.toLowerCase().includes(filteringFor.toLowerCase())
    );
    setNewFilteredPersons(filteredPeople);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter onFiltering={handleFilter} />
      <h2>add a new entry</h2>
      <PersonsForm
        onPersonSumbit={addNewPerson}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      {filteredPersons.map((filterdPerson) => (
        <Person
          key={filterdPerson.id}
          name={filterdPerson.name}
          number={filterdPerson.number}
        />
      ))}
    </div>
  );
};

export default App;
