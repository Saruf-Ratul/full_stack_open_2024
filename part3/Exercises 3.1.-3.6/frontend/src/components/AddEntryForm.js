import React, { useState } from 'react';
import apiService from '../services/apiService';
import Notification from './Notification';
import './AddEntryForm.css'; // Import CSS for styling
import 'react-toastify/dist/ReactToastify.css';

const AddEntryForm = ({ onAddEntry }) => {
    const [showSuccessNotification, setShowSuccessNotification] = useState(false);
    const [showErrorNotification, setShowErrorNotification] = useState(false); // Add this line
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newEntry = await apiService.addEntry({ name, number });
            setShowSuccessNotification(true);
            setTimeout(() => setShowSuccessNotification(true), 1000); // Hide success notification after 3 seconds
            setTimeout(() => window.location.reload(), 1000);
            onAddEntry(newEntry);
            setName('');
            setNumber('');
        } catch (error) {
            setShowSuccessNotification(false);
            setShowErrorNotification(true);
            setTimeout(() => setShowErrorNotification(false), 1000); // Hide error notification after 3 seconds
            //alert('Error adding entry: ' + error.message);
            // console.error('Error adding entry:', error);
        }        
    };

    return (
        <div className="add-entry-form-container">
            <h2>Add New Entry</h2>
            <form onSubmit={handleSubmit} className="add-entry-form">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="input-field"
                />
                <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Number"
                    className="input-field"
                />
                <button type="submit" className="add-entry-button">Add Entry</button>
            </form>
            {showSuccessNotification && <Notification message="Entry added successfully" type="success" />}
            {showErrorNotification && <Notification message="Entry added failed" type="error" />}
        </div>
    );
};

export default AddEntryForm;
