import React, { useState } from 'react';
import apiService from '../services/apiService';

const UpdateEntryForm = ({ entry, onUpdateEntry }) => {
    const [name, setName] = useState(entry.name);
    const [number, setNumber] = useState(entry.number);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedEntry = await apiService.updateEntry(entry.id, { name, number });
            onUpdateEntry(updatedEntry);
        } catch (error) {
            console.error('Error updating entry:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} />
            <button type="submit">Update Entry</button>
        </form>
    );
};

export default UpdateEntryForm;
