import { useState, useEffect } from "react";
import Person from "./components/Person";
import PersonsForm from "./components/PersonsForm";
import SearchFilter from "./components/SearchFilter";
import numberService from "./numbers";
import Notification from "./components/notification";
//comment
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setNewFilteredPersons] = useState([]);
  const [newNotification, setNewNotification] = useState(null);
  const [newErrorMessage, setNewErrorMessage] = useState(null);

  const hook = () => {
    numberService.getAll().then((initialNumbers) => {
      setPersons(initialNumbers);
      setNewFilteredPersons(initialNumbers);
    });
  };
  //eventHandler to call the hook function
  useEffect(hook, []);

  const addNewPerson = (event) => {
    event.preventDefault();

    if (
      persons.some((val) => val.name === newName && val.number !== newNumber)
    ) {
      const personToUpdateNumber = persons.find((val) => val.name === newName);
      if (
        window.confirm(
          `${personToUpdateNumber.name} is already added to the phonebook, replace the old number with a new one ?`
        )
      ) {
        personToUpdateNumber.number = newNumber;
        numberService
          .updateNumber(personToUpdateNumber.id, personToUpdateNumber)
          .then(() => {
            setNewFilteredPersons(filteredPersons.filter(() => true));
            setPersons(persons.filter(() => true));
            setNewNotification(
              `${personToUpdateNumber.name}'s number was updated to : ${newNumber}`
            );
            setTimeout(() => {
              setNewNotification(null);
            }, 5000);
          })
          .catch((error) => {
            setNewErrorMessage(
              `Informatio of ${personToUpdateNumber.name} has already been removed from server.`
            );
            setTimeout(() => {
              setNewNotification(null);
            }, 5000);
          });
      } else {
        console.log(`Didnt update number of ${personToUpdateNumber.name}`);
        setNewName("");
        setNewNumber("");
      }
    } else if (newName === "" && newNumber === "") {
      alert("Please enter a name");
    } else if (
      persons.some((val) => val.name === newName && val.number === newNumber)
    ) {
      alert("Duplicate entry, please change name or number!");
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      numberService.postNumber(newPerson).then((returnedNumber) => {
        setPersons(persons.concat(returnedNumber));
        setNewFilteredPersons(filteredPersons.concat(returnedNumber));
      });
      setNewNotification(
        `${newPerson.name} was added to the phonebook with number : ${newPerson.number}`
      );
      setTimeout(() => {
        setNewNotification(null);
      }, 5000);
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

  const deleteNumber = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name} ?`)) {
      numberService.deleteNumber(id).then((deletedNote) => {
        setNewFilteredPersons(
          filteredPersons.filter((person) => person.id !== deletedNote.id)
        );
        setPersons(persons.filter((person) => person.id !== deletedNote.id));
      });
    } else {
      console.log("Nope you dont :) ");
    }
  };
  const handleDeletion = (id, name) => {
    const windowButton = document.querySelector("#windowButton");

    windowButton.addEventListener(onclick, deleteNumber(id, name));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification} errorMessage={newErrorMessage} />
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
          onDelete={() => handleDeletion(filterdPerson.id, filterdPerson.name)}
        />
      ))}
    </div>
  );
};

export default App;
