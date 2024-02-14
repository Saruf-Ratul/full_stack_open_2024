// // App.js
// import React, { useState ,useEffect } from "react";
// import axios from 'axios';
// import PersonForm from "./PersonForm";
// import Persons from "./Persons";
// import Filter from "./Filter";
// import personsService from './services/persons';

// const App = () => {
//   const [persons, setPersons] = useState([
//     { name: "Arto Hellas", number: "123-456-7890" },
//   ]);
//   const [newName, setNewName] = useState("");
//   const [newNumber, setNewNumber] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
// //2.11: The Phonebook Step6
//   useEffect(() => {
//     axios
//       .get('http://localhost:3001/persons')
//       .then(response => {
//         setPersons(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);
//   // ...

//   const handleNameChange = (event) => {
//     setNewName(event.target.value);
//   };

//   const handleNumberChange = (event) => {
//     setNewNumber(event.target.value);
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const addPerson = (event) => {
//     event.preventDefault();
//     const personObject = {
//       name: newName,
//       number: newNumber,
//     };

// //2.11: Phonebook 
//     axios
//     .post('http://localhost:3001/persons', personObject)
//     .then(response => {
//       setPersons(persons.concat(response.data));
//       setNewName('');
//       setNewNumber('');
//     })
//     .catch(error => {
//       console.error('Error adding person:', error);
//     });

// //...

//     // Check if person already exists
//     const isDuplicate = persons.some((person) => person.name === newName);
//     if (isDuplicate) {
//       alert(`${newName} is already added to the phonebook`);
//     } else {
//       setPersons(persons.concat(personObject));
//       setNewName("");
//       setNewNumber("");
//     }
//   };

//   const filteredPersons = persons.filter((person) =>
//     person.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <h2> Phonebook </h2>{" "}
//       <Filter searchTerm={searchTerm} handleSearch={handleSearch} />{" "}
//       <h3> Add a new </h3>{" "}
//       <PersonForm
//         newName={newName}
//         newNumber={newNumber}
//         handleNameChange={handleNameChange}
//         handleNumberChange={handleNumberChange}
//         addPerson={addPerson}
//       />{" "}
//       <h3> Numbers </h3> 
//       <Persons persons={filteredPersons} />{" "}
//       <h3> Total Numbers </h3> 
//       <ul>
//         {persons.map(person => (
//           <li key={person.id}>{person.name} {person.number}</li>
//         ))}
//       </ul>
//     </div>

    
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import personsService from './services/persons';
import Notification from './Notification';
import './App.css'; // Importing App.css for styling

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personsService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => (person.id !== existingPerson.id ? person : returnedPerson)));
            setNewName('');
            setNewNumber('');
            showNotification(`Updated ${returnedPerson.name}'s number`);
          })
          .catch(error => {
            console.error('Error updating person:', error);
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };

      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          showNotification(`Added ${returnedPerson.name}`);
        })
        .catch(error => {
          console.error('Error adding person:', error);
        });
    }
  };

  const deletePerson = (id) => {
    if (window.confirm('Delete this person?')) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          showNotification('Person deleted');
        })
        .catch(error => {
          console.error('Error deleting person:', error);
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <h2>Add a New Contact</h2>
      <form onSubmit={addPerson}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={newName}
            onChange={handleNameChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="number">Number:</label>
          <input
            type="text"
            id="number"
            value={newNumber}
            onChange={handleNumberChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
      <h2>Numbers</h2>
      <ul className="persons-list">
        {filteredPersons.map(person => (
          <li key={person.id} className="person-item">
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id)} className="btn btn-delete">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

