import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const Phonebook = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const data = await apiService.getAllEntries();
                setEntries(data);
            } catch (error) {
                console.error('Error fetching entries:', error);
            }
        };
        fetchEntries();
    }, []);

    return (
        <div>
            <h2>Phonebook</h2>
            <ul>
                {entries.map((entry) => (
                    <li key={entry.id}>{entry.name}: {entry.number}</li>
                ))}
            </ul>
        </div>
    );
};

export default Phonebook;
