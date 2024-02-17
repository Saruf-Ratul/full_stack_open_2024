import React from 'react';
import AddEntryForm from './components/AddEntryForm';
import Phonebook from './components/Phonebook';

const App = () => {
    return (
        <div>
            <h1>Phonebook App</h1>
            <AddEntryForm />
            <Phonebook />
        </div>
    );
};

export default App;
